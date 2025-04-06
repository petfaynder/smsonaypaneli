'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Sipariş verileri - normalde API'dan gelir
const orders = [
  {
    id: '12345',
    service: 'WhatsApp',
    serviceIcon: '/images/services/whatsapp.svg',
    number: '+90 555 123 4567',
    country: 'TR',
    countryFlag: '/images/flags/tr.svg',
    status: 'success',
    message: 'Your verification code is: 123456',
    created: '2024-04-02T14:30:00',
    completed: '2024-04-02T14:35:00',
    price: 2.50
  },
  {
    id: '12346',
    service: 'Instagram',
    serviceIcon: '/images/services/instagram.svg',
    number: '+1 555 987 6543',
    country: 'US',
    countryFlag: '/images/flags/us.svg',
    status: 'success',
    message: 'Instagram code: 5678',
    created: '2024-04-01T10:15:00',
    completed: '2024-04-01T10:19:00',
    price: 5.00
  },
  {
    id: '12347',
    service: 'Telegram',
    serviceIcon: '/images/services/telegram.svg',
    number: '+7 999 123 4567',
    country: 'RU',
    countryFlag: '/images/flags/ru.svg',
    status: 'success',
    message: 'Telegram verification code: 8901',
    created: '2024-03-30T18:45:00',
    completed: '2024-03-30T18:49:00',
    price: 3.00
  },
  {
    id: '12348',
    service: 'Gmail',
    serviceIcon: '/images/services/gmail.svg',
    number: '+44 7700 900123',
    country: 'UK',
    countryFlag: '/images/flags/gb.svg',
    status: 'timeout',
    message: '',
    created: '2024-03-29T09:20:00',
    completed: '',
    price: 6.00
  },
  {
    id: '12349',
    service: 'Facebook',
    serviceIcon: '/images/services/facebook.svg',
    number: '+49 123 4567890',
    country: 'DE',
    countryFlag: '/images/flags/de.svg',
    status: 'error',
    message: '',
    created: '2024-03-28T14:10:00',
    completed: '',
    price: 4.50
  },
];

// Filtre seçenekleri
const filterOptions = {
  status: ['all', 'success', 'error', 'timeout'],
  services: ['All', 'WhatsApp', 'Instagram', 'Telegram', 'Facebook', 'Gmail', 'Twitter', 'Tinder', 'Discord'],
  countries: ['All', 'TR', 'US', 'RU', 'UK', 'DE', 'FR', 'NL']
};

export default function Orders() {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    service: 'All',
    country: 'All',
    dateRange: '7days'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  
  // Siparişleri filtreleme fonksiyonu
  useEffect(() => {
    let result = [...orders];
    
    // Durum filtresi
    if (activeFilters.status !== 'all') {
      result = result.filter(order => order.status === activeFilters.status);
    }
    
    // Servis filtresi
    if (activeFilters.service !== 'All') {
      result = result.filter(order => order.service === activeFilters.service);
    }
    
    // Ülke filtresi
    if (activeFilters.country !== 'All') {
      result = result.filter(order => order.country === activeFilters.country);
    }
    
    // Tarih aralığı filtresi
    if (activeFilters.dateRange !== 'all') {
      const now = new Date();
      let cutoffDate = new Date();
      
      if (activeFilters.dateRange === '24hours') {
        cutoffDate.setDate(now.getDate() - 1);
      } else if (activeFilters.dateRange === '7days') {
        cutoffDate.setDate(now.getDate() - 7);
      } else if (activeFilters.dateRange === '30days') {
        cutoffDate.setDate(now.getDate() - 30);
      }
      
      result = result.filter(order => {
        const orderDate = new Date(order.created);
        return orderDate >= cutoffDate;
      });
    }
    
    // Arama sorgusu
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) ||
        order.number.toLowerCase().includes(query) ||
        order.service.toLowerCase().includes(query) ||
        (order.message && order.message.toLowerCase().includes(query))
      );
    }
    
    setFilteredOrders(result);
    setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön
  }, [activeFilters, searchQuery]);
  
  // Durum renkleri
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      case 'timeout':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Durum metni
  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Başarılı';
      case 'error':
        return 'Hata';
      case 'timeout':
        return 'Süre Doldu';
      default:
        return 'Bilinmiyor';
    }
  };
  
  // Tarih formatı
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Sipariş detayını aç
  const openOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };
  
  // Pagination için
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Siparişlerim</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Tüm sipariş geçmişinizi görüntüleyin ve yönetin.
        </p>
      </div>
      
      {/* Filtreler ve Arama */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Durum
            </label>
            <select
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
              value={activeFilters.status}
              onChange={(e) => setActiveFilters({...activeFilters, status: e.target.value})}
            >
              <option value="all">Tümü</option>
              <option value="success">Başarılı</option>
              <option value="error">Hata</option>
              <option value="timeout">Süre Doldu</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Servis
            </label>
            <select
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
              value={activeFilters.service}
              onChange={(e) => setActiveFilters({...activeFilters, service: e.target.value})}
            >
              {filterOptions.services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tarih Aralığı
            </label>
            <select
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
              value={activeFilters.dateRange}
              onChange={(e) => setActiveFilters({...activeFilters, dateRange: e.target.value})}
            >
              <option value="24hours">Son 24 Saat</option>
              <option value="7days">Son 7 Gün</option>
              <option value="30days">Son 30 Gün</option>
              <option value="all">Tüm Zamanlar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Arama
            </label>
            <input
              type="text"
              placeholder="Numara, Servis, ID..."
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Siparişler Tablosu */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Sipariş Geçmişi</h2>
        </div>
        
        <div className="overflow-x-auto">
          {filteredOrders.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Servis
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Numara
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Durum
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => openOrderDetail(order)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 relative">
                          <Image 
                            src={order.serviceIcon} 
                            alt={order.service}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {order.service}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-5 w-5 relative mr-2">
                          <Image 
                            src={order.countryFlag} 
                            alt={order.country}
                            width={20}
                            height={20}
                            className="object-cover rounded-sm"
                          />
                        </div>
                        <div className="text-sm text-gray-900 dark:text-gray-100">{order.number}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(order.created)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {order.price.toFixed(2)} ₺
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(order.number);
                          alert('Numara kopyalandı!');
                        }}
                      >
                        Kopyala
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Sipariş bulunamadı</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Farklı filtrelerle tekrar aramayı deneyin.</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Toplam <span className="font-medium">{filteredOrders.length}</span> sonuç
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                Önceki
              </button>
              <span className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sonraki
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Sipariş Detay Modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsDetailModalOpen(false)}>
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  Sipariş Detayı
                </h3>
                <button
                  type="button"
                  className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                  onClick={() => setIsDetailModalOpen(false)}
                >
                  <span className="sr-only">Kapat</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
                  <div className="flex justify-between mb-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Sipariş ID</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.id}</div>
                  </div>
                  <div className="flex justify-between mb-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Servis</div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 relative mr-2">
                        <Image 
                          src={selectedOrder.serviceIcon} 
                          alt={selectedOrder.service}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.service}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Numara</div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 relative mr-2">
                        <Image 
                          src={selectedOrder.countryFlag} 
                          alt={selectedOrder.country}
                          width={20}
                          height={20}
                          className="object-cover rounded-sm"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.number}</span>
                      <button
                        className="ml-2 text-purple-600 hover:text-purple-500 dark:text-purple-400"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedOrder.number);
                          alert('Numara kopyalandı!');
                        }}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
                  <div className="flex justify-between mb-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Oluşturulma Tarihi</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(selectedOrder.created)}</div>
                  </div>
                  <div className="flex justify-between mb-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Tamamlanma Tarihi</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(selectedOrder.completed) || '-'}</div>
                  </div>
                  <div className="flex justify-between mb-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Durum</div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusText(selectedOrder.status)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Fiyat</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.price.toFixed(2)} ₺</div>
                  </div>
                </div>
                
                {selectedOrder.message && (
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">SMS Mesajı</div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{selectedOrder.message}</p>
                    </div>
                  </div>
                )}
                
                {!selectedOrder.message && selectedOrder.status === 'timeout' && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-lg p-3">
                    <div className="flex items-center text-yellow-700 dark:text-yellow-500">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>SMS zaman aşımına uğradı.</span>
                    </div>
                  </div>
                )}
                
                {!selectedOrder.message && selectedOrder.status === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-lg p-3">
                    <div className="flex items-center text-red-700 dark:text-red-500">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>İşlem başarısız oldu.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 