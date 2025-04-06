interface LicenseConfig {
  // Uygulamanın sürüm bilgisi
  version: string;
  // Lisans sistemi için API endpoint'i
  licenseServer: string;
  // Lisans güncelleme aralığı (milisaniye cinsinden)
  checkInterval: number;
  // Lisans anahtarı (environment değişkeninden alınacak)
  apiKey: string | null;
  // Geliştirme modu
  isDevelopment: boolean;
}

const config: LicenseConfig = {
  version: '1.0.0',
  licenseServer: process.env.LICENSE_SERVER || 'https://license.smsonaypanel.com/api',
  checkInterval: 24 * 60 * 60 * 1000, // 24 saat
  apiKey: process.env.LICENSE_API_KEY || null,
  isDevelopment: process.env.NODE_ENV === 'development',
};

export default config; 