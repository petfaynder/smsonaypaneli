import axios from 'axios';
import { getLicenseInfo, refreshLicense } from './license';

export interface UpdateInfo {
  currentVersion: string;
  latestVersion: string;
  updateAvailable: boolean;
  licenseInfo: {
    domain: string;
    isValid: boolean;
    expiresAt: string;
  };
  updates: {
    version: string;
    releaseDate: string;
    description: string;
    changes: string[];
  }[];
}

/**
 * Mevcut uygulama versiyonunu döndürür
 * @returns {string} - Uygulama versiyonu
 */
export function getCurrentVersion(): string {
  return process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';
}

/**
 * Güncelleme bilgisini kontrol eder
 * @returns {Promise<UpdateInfo | null>} - Güncelleme bilgisi
 */
export async function checkForUpdates(): Promise<UpdateInfo | null> {
  try {
    const licenseInfo = await getLicenseInfo();
    
    if (!licenseInfo || !licenseInfo.isValid) {
      console.error('Güncelleme kontrolü için geçerli lisans gereklidir');
      return null;
    }
    
    const currentVersion = getCurrentVersion();
    const licenseServer = process.env.LICENSE_SERVER || 'https://license.example.com';
    const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost';
    
    const response = await axios.get(`${licenseServer}/api/updates`, {
      params: {
        currentVersion,
        domain,
        licenseKey: licenseInfo.licenseKey
      }
    });
    
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.error('Güncelleme bilgisi alınamadı:', response.data?.message || 'Bilinmeyen hata');
      return null;
    }
  } catch (error) {
    console.error('Güncelleme kontrolü hatası:', error);
    
    // Geliştirme modunda ise veya sunucu ile iletişim kurulamadıysa
    // Simüle edilmiş güncelleme bilgisi döndür
    if (process.env.NODE_ENV === 'development' || (error as any)?.code === 'ECONNREFUSED') {
      const licenseInfo = await getLicenseInfo();
      const currentVersion = getCurrentVersion();
      
      // Geliştirme için örnek güncelleme bilgisi
      return {
        currentVersion,
        latestVersion: '1.1.0',
        updateAvailable: true,
        licenseInfo: {
          domain: licenseInfo?.domain || 'localhost',
          isValid: licenseInfo?.isValid || true,
          expiresAt: licenseInfo?.expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        updates: [
          {
            version: '1.1.0',
            releaseDate: new Date().toISOString(),
            description: 'Bu bir örnek güncelleme bilgisidir',
            changes: [
              'Yeni API entegrasyonları eklendi',
              'Kullanıcı arayüzü iyileştirildi',
              'Performans optimizasyonları yapıldı'
            ]
          }
        ]
      };
    }
    
    return null;
  }
}

/**
 * Güncelleme sürecini başlatır
 * @param {string} targetVersion - Hedef versiyon
 * @returns {Promise<{success: boolean, message: string, progress?: number, eta?: number}>} - Güncelleme sonucu
 */
export async function startUpdate(targetVersion: string): Promise<{
  success: boolean;
  message: string;
  progress?: number;
  eta?: number;
}> {
  try {
    const licenseInfo = await refreshLicense(); // En güncel lisans bilgisini al
    
    if (!licenseInfo || !licenseInfo.isValid) {
      return {
        success: false,
        message: 'Güncelleme için geçerli lisans gereklidir'
      };
    }
    
    const currentVersion = getCurrentVersion();
    const licenseServer = process.env.LICENSE_SERVER || 'https://license.example.com';
    const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost';
    
    const response = await axios.post(`${licenseServer}/api/updates/start`, {
      currentVersion,
      targetVersion,
      domain,
      licenseKey: licenseInfo.licenseKey
    });
    
    if (response.status === 200 && response.data) {
      return {
        success: true,
        message: response.data.message || 'Güncelleme başlatıldı',
        progress: response.data.progress || 0,
        eta: response.data.eta || 0
      };
    } else {
      return {
        success: false,
        message: response.data?.message || 'Güncelleme başlatılamadı'
      };
    }
  } catch (error) {
    console.error('Güncelleme başlatma hatası:', error);
    
    // Geliştirme modunda ise veya sunucu ile iletişim kurulamadıysa
    // Simüle edilmiş bir yanıt döndür
    if (process.env.NODE_ENV === 'development' || (error as any)?.code === 'ECONNREFUSED') {
      return {
        success: true,
        message: 'Geliştirme modunda güncelleme simüle ediliyor',
        progress: 5,
        eta: 300 // 5 dakika
      };
    }
    
    return {
      success: false,
      message: `Güncelleme başlatılamadı: ${(error as Error).message}`
    };
  }
}

/**
 * Güncelleme durumunu kontrol eder
 * @returns {Promise<{progress: number, status: string, eta: number}>} - Güncelleme durumu
 */
export async function getUpdateStatus(): Promise<{
  progress: number;
  status: string;
  eta: number;
}> {
  try {
    const licenseInfo = await getLicenseInfo();
    
    if (!licenseInfo || !licenseInfo.isValid) {
      return {
        progress: 0,
        status: 'error',
        eta: 0
      };
    }
    
    const licenseServer = process.env.LICENSE_SERVER || 'https://license.example.com';
    const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost';
    
    const response = await axios.get(`${licenseServer}/api/updates/status`, {
      params: {
        domain,
        licenseKey: licenseInfo.licenseKey
      }
    });
    
    if (response.status === 200 && response.data) {
      return {
        progress: response.data.progress || 0,
        status: response.data.status || 'unknown',
        eta: response.data.eta || 0
      };
    } else {
      return {
        progress: 0,
        status: 'error',
        eta: 0
      };
    }
  } catch (error) {
    console.error('Güncelleme durumu kontrolü hatası:', error);
    
    // Geliştirme modunda ise veya sunucu ile iletişim kurulamadıysa
    // Simüle edilmiş bir yanıt döndür
    if (process.env.NODE_ENV === 'development' || (error as any)?.code === 'ECONNREFUSED') {
      return {
        progress: 45, // Örnek ilerleme
        status: 'downloading',
        eta: 180 // 3 dakika
      };
    }
    
    return {
      progress: 0,
      status: 'error',
      eta: 0
    };
  }
} 