'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCountries, getServices, Country, Service } from '@/lib/dataService'
import { getSmsService } from '@/lib/services/smsService'
import { NumberRequest, ServiceStatus, PhoneNumber, Order, SmsApiProvider } from '@/types/smsApi'
import DashboardAnnouncement from '@/components/DashboardAnnouncement'
import NotificationAnnouncement from '@/components/NotificationAnnouncement'

// Icon components
const OrdersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
  </svg>
)

const WalletIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
  </svg>
)

const SupportIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
)

// Simüle edilmiş aktif siparişler
const mockActiveOrders = [
  {
    id: 12345,
    service: 'WhatsApp',
    number: '+905551234567',
    country: 'TR',
    status: 'waiting', // waiting, received, timeout
    createdAt: new Date(Date.now() - 120000), // 2 dakika önce
    expiresAt: new Date(Date.now() + 600000), // 10 dakika sonra
  },
  {
    id: 12346,
    service: 'Gmail',
    number: '+15551234567',
    country: 'US',
    status: 'received',
    message: 'Your verification code is: 123456',
    createdAt: new Date(Date.now() - 300000), // 5 dakika önce
    expiresAt: new Date(Date.now() + 420000), // 7 dakika sonra
  },
]

// İstatistik kartı bileşeni
function StatCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
      <div className="flex items-center">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const smsService = getSmsService()
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedServiceName, setSelectedServiceName] = useState<string>('Uygulama Seçin')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeNumber, setActiveNumber] = useState<PhoneNumber | null>(null)
  const [smsCode, setSmsCode] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<number>(0)
  
  // Arama filtresi için state'ler
  const [serviceSearchQuery, setServiceSearchQuery] = useState<string>('')
  const [countrySearchQuery, setCountrySearchQuery] = useState<string>('')
  
  // API verilerini state'lerde saklayalım
  const [countries, setCountries] = useState<Country[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loadingData, setLoadingData] = useState(true)
  
  // Aktif siparişler
  const [orders, setOrders] = useState<PhoneNumber[]>([])

  // Kullanıcı bilgileri
  const [user, setUser] = useState({
    balance: 0,
    ticketCount: 0
  })

  // Dropdown için yeni state'ler
  const [showServiceDropdown, setShowServiceDropdown] = useState<boolean>(false)
  const serviceDropdownRef = useRef<HTMLDivElement>(null)

  // Dropdown dışına tıklama için effect
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setShowServiceDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Verileri yükle
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (!isMounted) return;
      setLoadingData(true);
      try {
        console.log('Starting to load services and countries...');
        
        // Servisleri yükle
        const apiServices = await smsService.getServices(SmsApiProvider.FIVE_SIM, {});
        console.log('Services API response:', apiServices);
        
        if (!isMounted) return;
        
        if (apiServices && apiServices.length > 0) {
          // API servislerini UI servislerine dönüştür
          const uiServices: Service[] = apiServices.map(service => ({
            id: service.id,
            name: service.name,
            icon: `/images/services/${service.id.toLowerCase()}.svg`,
            price: service.price || 0,
            available: service.available || true,
            countryPrices: service.countryPrices || {}
          }));
          setServices(uiServices);
        } else {
          console.warn('No services data available from API');
          setServices([]);
        }
        
        // Ülkeleri yükle
        const apiCountries = await smsService.getCountries(SmsApiProvider.FIVE_SIM, {});
        console.log('Countries API response:', apiCountries);
        
        if (!isMounted) return;
        
        if (apiCountries && apiCountries.length > 0) {
          // API ülkelerini UI ülkelerine dönüştür
          const uiCountries: Country[] = apiCountries.map(country => ({
            id: country.id,
            code: country.code,
            name: country.name,
            flag: `/images/flags/${country.code.toLowerCase()}.svg`,
            originalName: country.name,
            available: country.available || true
          }));
          setCountries(uiCountries);
        } else {
          console.warn('No countries data available from API');
          setCountries([]);
        }
        
        // Aktif siparişleri getir
        const activeNumbers = await smsService.getActiveNumbers(SmsApiProvider.FIVE_SIM, {});
        console.log('Active numbers API response:', activeNumbers);
        
        if (!isMounted) return;
        
        if (activeNumbers && activeNumbers.length > 0) {
          const newOrders: PhoneNumber[] = activeNumbers.map(num => ({
            id: num.id,
            serviceId: num.serviceId,
            number: num.number,
            countryId: num.countryId,
            status: num.status,
            provider: SmsApiProvider.FIVE_SIM,
            createdAt: num.createdAt || new Date(),
            expiresAt: num.expiresAt || new Date(Date.now() + 900000),
            smsCode: num.smsCode
          }));
          setOrders(newOrders);
        }
      } catch (error) {
        console.error("API Error Details:", {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        
        if (!isMounted) return;
        
        // Hata durumunda fallback verileri kullan
        try {
          const [fallbackServices, fallbackCountries] = await Promise.all([
            smsService.getServices(SmsApiProvider.FIVE_SIM, {}),
            smsService.getCountries(SmsApiProvider.FIVE_SIM, {})
          ]);
          console.log('Using fallback data after API error:', { 
            fallbackServices, 
            fallbackCountries 
          });
          
          if (fallbackServices && fallbackServices.length > 0) {
            // API servislerini UI servislerine dönüştür
            const uiServices: Service[] = fallbackServices.map(service => ({
              id: service.id,
              name: service.name,
              icon: `/images/services/${service.id.toLowerCase()}.svg`,
              price: service.price || 0,
              available: service.available || true,
              countryPrices: service.countryPrices || {}
            }));
            setServices(uiServices);
          }
          
          if (fallbackCountries && fallbackCountries.length > 0) {
            // API ülkelerini UI ülkelerine dönüştür
            const uiCountries: Country[] = fallbackCountries.map(country => ({
              id: country.id,
              code: country.code,
              name: country.name,
              flag: `/images/flags/${country.code.toLowerCase()}.svg`,
              originalName: country.name,
              available: country.available || true
            }));
            setCountries(uiCountries);
          }
        } catch (fallbackError) {
          console.error("Fallback data error:", {
            error: fallbackError instanceof Error ? fallbackError.message : 'Unknown error',
            stack: fallbackError instanceof Error ? fallbackError.stack : undefined
          });
        }
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Aktif numaraları yükle
  useEffect(() => {
    const loadActiveNumbers = async () => {
      try {
        const activeNumbers = await smsService.getActiveNumbers();
        const newOrders: PhoneNumber[] = activeNumbers.map(num => ({
          id: num.id,
          serviceId: num.serviceId,
          number: num.number,
          countryId: num.countryId,
          status: num.status,
          provider: SmsApiProvider.SMS_ACTIVATE,
          createdAt: num.createdAt || new Date(),
          expiresAt: num.expiresAt || new Date(Date.now() + 900000),
        }));
        setOrders(newOrders);
      } catch (error) {
        console.error('Aktif numaralar yüklenemedi:', error);
      }
    };

    loadActiveNumbers();
  }, [services, countries]);

  // Numara al işlemi
  const handleGetNumber = async () => {
    if (!selectedService || !selectedCountry) {
      alert('Lütfen servis ve ülke seçin!');
      return;
    }

    setLoading(true);
    try {
      console.log('Requesting number for:', {
        serviceId: selectedService.id,
        countryId: selectedCountry.id
      });

      const number = await smsService.requestNumber(
        selectedService.id,
        selectedCountry.id
      );

      if (number) {
        console.log('Number received:', number);
        setActiveNumber(number);
        setCountdown(900); // 15 dakika

        // Yeni siparişi listeye ekle
        const newOrder: PhoneNumber = {
          id: number.id,
          serviceId: selectedService.id,
          number: number.number,
          countryId: selectedCountry.id,
          status: number.status,
          provider: SmsApiProvider.SMS_ACTIVATE,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 900000),
          smsCode: number.smsCode
        };

        setOrders(prev => [...prev, newOrder]);
      } else {
        alert('Numara alınamadı! Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Numara alma hatası:', error);
      alert('Numara alınırken bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  }
  
  // Numara siparişini iptal et
  const handleCancelOrder = async (orderId: string) => {
    try {
      const success = await smsService.cancelNumber(orderId);
      
      if (success) {
        setOrders(prev => prev.filter(order => order.id !== orderId));
        if (activeNumber?.id === orderId) {
          setActiveNumber(null);
          setSmsCode(null);
          setCountdown(0);
        }
      } else {
        alert('Sipariş iptal edilemedi!');
      }
    } catch (error) {
      console.error("Sipariş iptal hatası:", error);
      alert('Sipariş iptal edilirken bir hata oluştu!');
    }
  }
  
  // Telefon numarasını kopyala
  const handleCopyNumber = (number: string) => {
    navigator.clipboard.writeText(number)
      .then(() => {
        alert('Numara panoya kopyalandı!')
      })
      .catch(err => {
        console.error('Kopyalama başarısız oldu:', err)
      })
  }
  
  // Geri sayım için useEffect
  useEffect(() => {
    if (countdown <= 0) return
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [countdown])
  
  // Geri sayım formatı (mm:ss)
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // Servis seçildiğinde
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setSelectedServiceName(service.name);
    setShowServiceDropdown(false);
  }
  
  // Ülke seçildiğinde
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  }
  
  // Popüler servisler
  const popularServices = services.slice(0, 10);
  const otherServices = services.slice(10);

  // Hizmetleri filtrele
  const filteredServices = services
    .filter(service => 
      service.name.toLowerCase().includes(serviceSearchQuery.toLowerCase()))
    
  // Ülkeleri filtrele
  const filteredCountries = countries
    .filter(country => 
      country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) || 
      country.code.toLowerCase().includes(countrySearchQuery.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Duyurular */}
      <DashboardAnnouncement />
      
      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Toplam Sipariş"
          value={orders.length}
          icon={<OrdersIcon />}
        />
        <StatCard
          title="Aktif Sipariş"
          value={orders.filter(o => o.status === 'waiting').length}
          icon={<OrdersIcon />}
        />
        <StatCard
          title="Bakiye"
          value={`${user.balance.toFixed(2)} ₺`}
          icon={<WalletIcon />}
        />
        <StatCard
          title="Destek Talepleri"
          value={user.ticketCount}
          icon={<SupportIcon />}
        />
      </div>
      
      {/* Ana içerik - 2 sütunlu layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol sütun - Numara alma alanı */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Numara Al</h2>
            
            {/* Servis seçimi */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Servis Seçin
              </label>

              {/* Popüler servisler - 2 sütunlu grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {loadingData ? (
                  <p className="col-span-2 text-center text-sm text-gray-500">Servisler yükleniyor...</p>
                ) : (
                  popularServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`p-2 border rounded-lg flex items-center ${
                        selectedService?.id === service.id 
                          ? 'bg-purple-50 dark:bg-purple-900 border-purple-500' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="w-6 h-6 mr-2 flex-shrink-0">
                        <Image 
                          src={service.icon}
                          alt={service.name}
                          width={24}
                          height={24}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-900 dark:text-white">{service.name}</span>
                        <span className="text-xs text-blue-600 dark:text-blue-400">₺{service.price}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Diğer servisler için dropdown */}
              <div className="relative" ref={serviceDropdownRef}>
                <button 
                  onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                  className="w-full p-2.5 text-sm text-left bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    {selectedService && !popularServices.some(s => s.id === selectedService.id) ? (
                      <>
                        <div className="w-6 h-6 mr-2">
                          <Image 
                            src={selectedService.icon}
                            alt={selectedService.name}
                            width={24}
                            height={24}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span>{selectedServiceName}</span>
                      </>
                    ) : (
                      <span className="text-gray-500">Diğer Servisler</span>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showServiceDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                    <div className="p-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="search"
                          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                                  bg-white focus:ring-purple-500 focus:border-purple-500 
                                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                  dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                          placeholder="Servis Ara"
                          value={serviceSearchQuery}
                          onChange={(e) => setServiceSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {filteredServices.length === 0 ? (
                        <p className="p-2 text-center text-sm text-gray-500">Sonuç bulunamadı</p>
                      ) : (
                        filteredServices.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => handleServiceSelect(service)}
                            className={`w-full p-2 flex items-center text-left rounded-md ${
                              selectedService?.id === service.id 
                                ? 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                            }`}
                          >
                            <div className="w-6 h-6 mr-2">
                              <Image 
                                src={service.icon}
                                alt={service.name}
                                width={24}
                                height={24}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{service.name}</span>
                              <span className="text-xs text-blue-600 dark:text-blue-400">₺{service.price}</span>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Ülke seçimi */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ülke Seçin
              </label>
              
              {/* Ülke arama kutusu */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                            bg-white focus:ring-purple-500 focus:border-purple-500 
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    placeholder="Ülke Ara (+1, Amerika veya vb.)"
                    value={countrySearchQuery}
                    onChange={(e) => setCountrySearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Ülkeler - Tek sütun */}
              <div className="max-h-96 overflow-y-auto">
                {loadingData ? (
                  <p className="text-center text-sm text-gray-500">Ülkeler yükleniyor...</p>
                ) : (
                  filteredCountries.map((country) => (
                    <div 
                      key={country.id} 
                      className={`p-3 border rounded-lg mb-2 flex items-center justify-between ${
                        selectedCountry?.id === country.id 
                          ? 'bg-purple-50 dark:bg-purple-900 border-purple-500' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-6 h-4 mr-3 flex-shrink-0 border border-gray-200 dark:border-gray-700 overflow-hidden">
                          <Image 
                            src={country.flag}
                            alt={country.name}
                            width={24}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{country.name}</span>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span className="mr-2">Stok: {Math.floor(Math.random() * 100) + 10}</span>
                            <span>₺{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 90) + 10}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCountrySelect(country)}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          selectedCountry?.id === country.id
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {selectedCountry?.id === country.id ? 'Seçildi' : 'Seç'}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Numara al butonu */}
            <button
              onClick={handleGetNumber}
              disabled={!selectedService || !selectedCountry || loading}
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Yükleniyor...
                </span>
              ) : (
                'Numara Al'
              )}
            </button>
            
            {/* Numara alındıysa gösterilecek alan */}
            {activeNumber && (
              <div className="mt-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Aktif Numara</h3>
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {formatCountdown(countdown)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <span className="text-lg font-mono text-gray-900 dark:text-white">{activeNumber.number}</span>
                  <button
                    onClick={() => handleCopyNumber(activeNumber.number)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                {smsCode && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">SMS Alındı!</span>
                    </div>
                    <div className="text-center">
                      <span className="font-mono text-lg font-bold tracking-wider text-gray-900 dark:text-white">{smsCode}</span>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => handleCancelOrder(activeNumber.id.toString())}
                  className="mt-4 w-full py-2 px-4 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  İptal Et
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Sağ sütun - Aktif siparişler */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Aktif Siparişler</h2>
            
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Aktif sipariş bulunmuyor</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">SMS kodu almak için önce numara alın</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const serviceObj = services.find(s => s.id === order.serviceId);
                  const countryObj = countries.find(c => c.id === order.countryId);
                  
                  return (
                    <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {serviceObj?.icon && (
                            <div className="w-8 h-8 relative">
                              <Image 
                                src={serviceObj.icon}
                                alt={serviceObj.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{serviceObj?.name || 'Servis'}</h3>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              {countryObj && (
                                <div className="w-4 h-3 mr-1 flex-shrink-0 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                  <Image 
                                    src={countryObj.flag}
                                    alt={countryObj.name || 'Ülke'}
                                    width={16}
                                    height={12}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <span>{order.number}</span>
                              <span className="mx-1">•</span>
                              <span>{order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleCopyNumber(order.number)}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleCancelOrder(order.id.toString())}
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 