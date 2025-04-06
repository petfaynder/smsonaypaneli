'use server';

import licenseConfig from '@/config/license';

interface LicenseInfo {
  isValid: boolean;
  domain: string;
  expiresAt: Date | null;
  plan: string;
  features: string[];
  message: string;
}

// Lisans durumunu tutacak değişken
let cachedLicense: LicenseInfo | null = null;

/**
 * Lisans bilgilerini doğrular ve günceller
 */
export async function verifyLicense(): Promise<LicenseInfo> {
  // Geliştirme modunda ise her zaman geçerli lisans döndür
  if (licenseConfig.isDevelopment) {
    return {
      isValid: true,
      domain: 'localhost',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 yıl sonrası
      plan: 'DEVELOPER',
      features: ['ALL_FEATURES'],
      message: 'Development modu - Lisans kontrolü yapılmadı',
    };
  }

  // Lisans sunucusundan API anahtarı ile lisans bilgilerini al
  try {
    // Mevcut domain bilgisini al
    const currentDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 
                          (typeof window !== 'undefined' ? window.location.hostname : 'unknown');

    // API anahtarı yoksa hata fırlat
    if (!licenseConfig.apiKey) {
      throw new Error('Lisans API anahtarı bulunamadı');
    }

    // Lisans sunucusundan bilgileri al
    const response = await fetch(`${licenseConfig.licenseServer}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${licenseConfig.apiKey}`,
      },
      body: JSON.stringify({
        domain: currentDomain,
        version: licenseConfig.version,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Lisans doğrulama hatası: ${response.status}`);
    }

    const licenseData = await response.json();
    
    // Lisans bilgilerini önbelleğe al
    cachedLicense = {
      isValid: licenseData.isValid,
      domain: licenseData.domain,
      expiresAt: licenseData.expiresAt ? new Date(licenseData.expiresAt) : null,
      plan: licenseData.plan,
      features: licenseData.features || [],
      message: licenseData.message || 'Lisans doğrulandı',
    };

    return cachedLicense;
  } catch (error) {
    console.error('Lisans doğrulama hatası:', error);
    
    // Hata durumunda daha önce alınmış geçerli bir lisans varsa onu kullan
    if (cachedLicense && cachedLicense.isValid) {
      console.log('Önbellekteki lisans bilgileri kullanılıyor');
      return cachedLicense;
    }
    
    // Lisans bilgisi yoksa sınırlı bir erişim döndür
    return {
      isValid: false,
      domain: 'unknown',
      expiresAt: null,
      plan: 'NONE',
      features: [],
      message: 'Lisans doğrulanamadı, lütfen sistem yöneticinize başvurun',
    };
  }
}

/**
 * Belirli bir özelliğin kullanılabilir olup olmadığını kontrol eder
 */
export async function hasFeature(featureName: string): Promise<boolean> {
  // Lisans bilgisi yoksa yeniden al
  if (!cachedLicense) {
    cachedLicense = await verifyLicense();
  }
  
  // Lisans geçerli değilse veya özellik yoksa false döndür
  if (!cachedLicense.isValid) return false;
  
  // DEVELOPER planı veya ALL_FEATURES özelliği varsa her zaman true döndür
  if (cachedLicense.plan === 'DEVELOPER' || cachedLicense.features.includes('ALL_FEATURES')) {
    return true;
  }
  
  // Belirli özelliği kontrol et
  return cachedLicense.features.includes(featureName);
}

/**
 * Mevcut lisans bilgilerini döndürür
 */
export async function getLicenseInfo(): Promise<LicenseInfo> {
  // Lisans bilgisi yoksa yeniden al
  if (!cachedLicense) {
    cachedLicense = await verifyLicense();
  }
  
  return cachedLicense;
}

/**
 * Lisans bilgilerini yeniden doğrular ve günceller
 */
export async function refreshLicense(): Promise<LicenseInfo> {
  // Mevcut önbelleği temizle ve yeniden doğrula
  cachedLicense = null;
  return await verifyLicense();
}

/**
 * Sistemin kullanılabilir durumda olup olmadığını kontrol eder
 */
export async function isSystemOperational(): Promise<boolean> {
  const license = await getLicenseInfo();
  return license.isValid;
} 