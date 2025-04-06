'use client';

import { useState, useEffect } from 'react';
import { getLicenseInfo, refreshLicense } from '@/lib/license';
import { FiShield, FiAlertTriangle, FiRefreshCw, FiCheck, FiX } from 'react-icons/fi';

interface LicensePageState {
  licenseInfo: {
    licenseKey: string;
    domain: string;
    isValid: boolean;
    expirationDate: string;
    features: string[];
    message?: string;
  } | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
}

export default function LicensePage() {
  const [state, setState] = useState<LicensePageState>({
    licenseInfo: null,
    loading: true,
    error: null,
    refreshing: false,
  });

  useEffect(() => {
    fetchLicenseInfo();
  }, []);

  const fetchLicenseInfo = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const licenseInfo = await getLicenseInfo();
      setState((prev) => ({ ...prev, licenseInfo, loading: false }));
    } catch (err) {
      console.error('Lisans bilgisi alınırken hata oluştu:', err);
      setState((prev) => ({
        ...prev,
        error: 'Lisans bilgisi alınamadı. Lütfen daha sonra tekrar deneyin.',
        loading: false,
      }));
    }
  };

  const handleRefreshLicense = async () => {
    setState((prev) => ({ ...prev, refreshing: true, error: null }));

    try {
      const licenseInfo = await refreshLicense();
      setState((prev) => ({ ...prev, licenseInfo, refreshing: false }));
    } catch (err) {
      console.error('Lisans yenilenirken hata oluştu:', err);
      setState((prev) => ({
        ...prev,
        error: 'Lisans yenilenemedi. Lütfen daha sonra tekrar deneyin.',
        refreshing: false,
      }));
    }
  };

  // Bitiş tarihine kalan gün sayısını hesapla
  const getDaysRemaining = (expirationDate: string) => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Kalan gün sayısına göre renk belirle
  const getExpirationColor = (expirationDate: string) => {
    const daysRemaining = getDaysRemaining(expirationDate);
    
    if (daysRemaining <= 7) return 'text-red-600 dark:text-red-400';
    if (daysRemaining <= 30) return 'text-amber-600 dark:text-amber-400';
    return 'text-green-600 dark:text-green-400';
  };

  // Özelliği insan dostu metne dönüştür
  const getFeatureDisplayName = (feature: string) => {
    const featureMap: Record<string, string> = {
      'all': 'Tüm Özellikler',
      'api_access': 'API Erişimi',
      'bulk_operations': 'Toplu İşlemler',
      'advanced_analytics': 'Gelişmiş Analitikler',
      'auto_updates': 'Otomatik Güncellemeler',
      'custom_branding': 'Özel Markalama',
      'multiple_users': 'Çoklu Kullanıcı',
      'priority_support': 'Öncelikli Destek',
      'white_label': 'White Label',
      'extended_history': 'Genişletilmiş Geçmiş',
      'advanced_security': 'Gelişmiş Güvenlik',
    };
    
    return featureMap[feature] || feature;
  };

  const { licenseInfo, loading, error, refreshing } = state;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lisans Bilgileri</h1>
          
          <button
            onClick={handleRefreshLicense}
            disabled={loading || refreshing}
            className={`inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium 
              ${
                loading || refreshing
                  ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            <FiRefreshCw className={`mr-1.5 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Lisansı Yenile
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <FiRefreshCw className="w-8 h-8 text-primary-500 animate-spin" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Lisans bilgileri alınıyor...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex">
              <FiAlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        ) : !licenseInfo ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex">
              <FiAlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div className="ml-3">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Lisans bilgisi bulunamadı. Lütfen sistem yöneticinize başvurun.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Lisans Durumu */}
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`flex-shrink-0 p-2 rounded-full ${
                licenseInfo.isValid 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {licenseInfo.isValid ? (
                  <FiCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <FiX className="w-6 h-6 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Lisans Durumu: {' '}
                  <span className={licenseInfo.isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {licenseInfo.isValid ? 'Aktif' : 'Geçersiz'}
                  </span>
                </h2>
                {licenseInfo.message && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{licenseInfo.message}</p>
                )}
              </div>
            </div>
            
            {/* Lisans Detayları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lisans Bilgileri</h3>
                <div className="bg-white dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Lisans Anahtarı</span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {`${licenseInfo.licenseKey.substring(0, 5)}...${licenseInfo.licenseKey.substring(licenseInfo.licenseKey.length - 5)}`}
                      </span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Domain</span>
                      <span className="text-sm text-gray-900 dark:text-white">{licenseInfo.domain}</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Bitiş Tarihi</span>
                      <span className={`text-sm ${getExpirationColor(licenseInfo.expirationDate)}`}>
                        {new Date(licenseInfo.expirationDate).toLocaleDateString('tr-TR')}
                        {' '}
                        ({getDaysRemaining(licenseInfo.expirationDate)} gün kaldı)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Kullanılabilir Özellikler</h3>
                <div className="bg-white dark:bg-gray-750 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  {licenseInfo.features.includes('all') ? (
                    <div className="flex items-center mb-2">
                      <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">Tüm özellikler kullanılabilir</span>
                    </div>
                  ) : licenseInfo.features.length > 0 ? (
                    <ul className="space-y-2">
                      {licenseInfo.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <FiCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="ml-2 text-sm text-gray-900 dark:text-white">
                            {getFeatureDisplayName(feature)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lisans için etkinleştirilmiş özellik bulunamadı.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bilgilendirme Kutusu */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex">
                <FiShield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Lisans ile ilgili sorunlarınız için <a href="mailto:support@example.com" className="font-medium underline">support@example.com</a> adresine e-posta gönderebilir veya <a href="/dashboard/contact" className="font-medium underline">destek sayfamızı</a> ziyaret edebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 