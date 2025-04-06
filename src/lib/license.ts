import axios from 'axios';

interface LicenseInfo {
  licenseKey: string;
  domain: string;
  isValid: boolean;
  expirationDate: string;
  features: string[];
  message?: string;
}

let licenseCache: LicenseInfo | null = null;
let lastVerified: number = 0;
const VERIFICATION_INTERVAL = 1000 * 60 * 60; // 1 saat

/**
 * Sistemin çalışıp çalışmadığını kontrol eder
 * @returns {boolean} - Sistemin çalışıp çalışmadığı bilgisi
 */
export async function isSystemOperational(): Promise<boolean> {
  const licenseInfo = await getLicenseInfo();
  return licenseInfo?.isValid || false;
}

/**
 * Lisans bilgisini alır, gerekirse uzak sunucudan doğrulama yapar
 * @returns {Promise<LicenseInfo | null>} - Lisans bilgisi
 */
export async function getLicenseInfo(): Promise<LicenseInfo | null> {
  const now = Date.now();
  
  // Önbellekte lisans bilgisi varsa ve son doğrulama üzerinden çok zaman geçmediyse
  if (licenseCache && (now - lastVerified < VERIFICATION_INTERVAL)) {
    return licenseCache;
  }
  
  try {
    const licenseKey = process.env.LICENSE_KEY || '';
    const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost';
    const licenseServer = process.env.LICENSE_SERVER || 'https://license.example.com';
    
    if (!licenseKey) {
      console.error('Lisans anahtarı bulunamadı');
      return null;
    }
    
    // Lisansı doğrula
    const response = await axios.post(`${licenseServer}/api/verify`, {
      licenseKey,
      domain
    });
    
    if (response.status === 200 && response.data) {
      licenseCache = response.data;
      lastVerified = now;
      return licenseCache;
    } else {
      console.error('Lisans doğrulama başarısız:', response.data?.message || 'Bilinmeyen hata');
      return null;
    }
  } catch (error) {
    // Geliştirme modunda ise veya lisans sunucusu ile iletişim kurulamadıysa
    // Geçici bir lisans bilgisi oluştur
    if (process.env.NODE_ENV === 'development' || (error as any)?.code === 'ECONNREFUSED') {
      const devLicense: LicenseInfo = {
        licenseKey: 'DEV-LICENSE',
        domain: 'localhost',
        isValid: true,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 gün
        features: ['all'],
      };
      
      licenseCache = devLicense;
      lastVerified = now;
      return devLicense;
    }
    
    console.error('Lisans doğrulama hatası:', error);
    return null;
  }
}

/**
 * Lisans bilgisini yeniler
 * @returns {Promise<LicenseInfo | null>} - Güncel lisans bilgisi
 */
export async function refreshLicense(): Promise<LicenseInfo | null> {
  // Önbelleği temizle
  licenseCache = null;
  lastVerified = 0;
  
  // Yeniden doğrula
  return await getLicenseInfo();
}

/**
 * Belirli bir özelliğin kullanılabilir olup olmadığını kontrol eder
 * @param {string} featureName - Özellik adı
 * @returns {Promise<boolean>} - Özelliğin kullanılabilir olup olmadığı
 */
export async function hasFeature(featureName: string): Promise<boolean> {
  const licenseInfo = await getLicenseInfo();
  
  if (!licenseInfo || !licenseInfo.isValid) {
    return false;
  }
  
  // 'all' özelliği tüm özelliklere erişim sağlar
  return licenseInfo.features.includes('all') || licenseInfo.features.includes(featureName);
} 