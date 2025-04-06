'use client';

import { useState, useEffect } from 'react';
import { checkForUpdates, startUpdate, getUpdateStatus, UpdateInfo } from '@/lib/update';
import { FiDownload, FiCheck, FiAlertTriangle, FiClock, FiRefreshCw } from 'react-icons/fi';

export default function UpdatePage() {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [updateStatus, setUpdateStatus] = useState<string>('idle');
  const [updateEta, setUpdateEta] = useState<number>(0);

  useEffect(() => {
    fetchUpdateInfo();
  }, []);

  // Güncelleme durumunu periyodik olarak kontrol et
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (updating) {
      interval = setInterval(async () => {
        try {
          const status = await getUpdateStatus();
          setUpdateProgress(status.progress);
          setUpdateStatus(status.status);
          setUpdateEta(status.eta);
          
          // Güncelleme tamamlandıysa
          if (status.status === 'completed') {
            setUpdating(false);
            await fetchUpdateInfo(); // Güncelleme bilgilerini yenile
            clearInterval(interval);
          }
          
          // Hata oluştuysa
          if (status.status === 'error') {
            setError('Güncelleme sırasında bir hata oluştu.');
            setUpdating(false);
            clearInterval(interval);
          }
        } catch (err) {
          console.error('Güncelleme durumu alınırken hata:', err);
          setError('Güncelleme durumu kontrol edilirken bir hata oluştu.');
          setUpdating(false);
          clearInterval(interval);
        }
      }, 3000); // 3 saniyede bir kontrol et
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [updating]);

  const fetchUpdateInfo = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const info = await checkForUpdates();
      setUpdateInfo(info);
    } catch (err) {
      console.error('Güncelleme bilgisi alınırken hata:', err);
      setError('Güncelleme bilgisi alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartUpdate = async () => {
    if (!updateInfo || !updateInfo.updateAvailable) return;
    
    setError(null);
    setUpdating(true);
    setUpdateProgress(0);
    setUpdateStatus('starting');
    
    try {
      const result = await startUpdate(updateInfo.latestVersion);
      
      if (result.success) {
        setUpdateProgress(result.progress || 0);
        setUpdateEta(result.eta || 0);
      } else {
        setError(result.message);
        setUpdating(false);
      }
    } catch (err) {
      console.error('Güncelleme başlatılırken hata:', err);
      setError('Güncelleme başlatılırken bir hata oluştu.');
      setUpdating(false);
    }
  };

  const formatEta = (seconds: number) => {
    if (seconds < 60) return `${seconds} saniye`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} dakika`;
  };

  // Güncelleme durumuna göre bilgi mesajı
  const getStatusInfo = () => {
    switch (updateStatus) {
      case 'starting':
        return 'Güncelleme başlatılıyor...';
      case 'downloading':
        return 'Güncelleme dosyaları indiriliyor...';
      case 'extracting':
        return 'Dosyalar çıkartılıyor...';
      case 'installing':
        return 'Güncelleme yükleniyor...';
      case 'restarting':
        return 'Servis yeniden başlatılıyor...';
      case 'completed':
        return 'Güncelleme tamamlandı!';
      case 'error':
        return 'Güncelleme sırasında bir hata oluştu.';
      default:
        return 'Güncelleme durumu bilinmiyor.';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sistem Güncellemeleri</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <FiRefreshCw className="w-8 h-8 text-primary-500 animate-spin" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Güncelleme bilgileri kontrol ediliyor...</span>
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
        ) : (
          <>
            {/* Lisans ve Versiyon Bilgileri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lisans Bilgileri</h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Domain:</span> {updateInfo?.licenseInfo.domain}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Durum:</span>{' '}
                    {updateInfo?.licenseInfo.isValid ? (
                      <span className="text-green-600 dark:text-green-400">Lisans Geçerli</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">Lisans Geçersiz</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Bitiş Tarihi:</span>{' '}
                    {new Date(updateInfo?.licenseInfo.expiresAt || '').toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Versiyon Bilgileri</h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Mevcut Versiyon:</span> {updateInfo?.currentVersion}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Son Versiyon:</span> {updateInfo?.latestVersion}
                  </p>
                  <p className="text-sm">
                    {updateInfo?.updateAvailable ? (
                      <span className="text-amber-600 dark:text-amber-400">Güncelleme mevcut</span>
                    ) : (
                      <span className="text-green-600 dark:text-green-400">Güncel sürümdesiniz</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Güncelleme Bilgileri */}
            {updateInfo?.updateAvailable && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mevcut Güncellemeler</h2>
                
                {updateInfo.updates.map((update, index) => (
                  <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                    <h3 className="text-md font-medium text-blue-800 dark:text-blue-300">
                      Versiyon {update.version} - {new Date(update.releaseDate).toLocaleDateString('tr-TR')}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{update.description}</p>
                    
                    {update.changes.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Değişiklikler:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {update.changes.map((change, changeIndex) => (
                            <li key={changeIndex}>{change}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Güncelleme Aksiyonu */}
            {updateInfo?.updateAvailable && !updating && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleStartUpdate}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiDownload className="mr-2 -ml-1 h-5 w-5" />
                  Şimdi Güncelle
                </button>
              </div>
            )}
            
            {/* Güncelleme İlerleme Durumu */}
            {updating && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {getStatusInfo()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {updateProgress}% {updateEta > 0 && `(Yaklaşık ${formatEta(updateEta)})`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${updateProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Yenileme Butonu */}
        <div className="flex justify-center mt-8">
          <button
            onClick={fetchUpdateInfo}
            disabled={loading || updating}
            className={`inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium 
              ${
                loading || updating
                  ? 'text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              }
            `}
          >
            <FiRefreshCw className={`mr-1.5 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
        </div>
      </div>
    </div>
  );
} 