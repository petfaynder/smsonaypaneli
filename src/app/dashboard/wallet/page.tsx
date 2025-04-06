'use client'

import { useState } from 'react'

// Ödeme yöntemi seçenekleri
const paymentMethods = [
  {
    id: 'papara',
    name: 'Papara',
    logo: '/images/payment/papara.svg',
    description: 'Anında Papara ile ödeme yapın',
    fees: '0%',
    minAmount: 10,
  },
  {
    id: 'credit-card',
    name: 'Kredi Kartı',
    logo: '/images/payment/credit-card.svg',
    description: 'Kredi/Banka kartınız ile güvenli ödeme',
    fees: '3%',
    minAmount: 25,
  },
  {
    id: 'havale',
    name: 'Havale / EFT',
    logo: '/images/payment/bank-transfer.svg',
    description: 'Banka hesabımıza havale veya EFT yapın',
    fees: '0%',
    minAmount: 50,
  },
  {
    id: 'crypto',
    name: 'Kripto Para',
    logo: '/images/payment/crypto.svg',
    description: 'Bitcoin veya diğer kripto paralarla ödeme',
    fees: '0%',
    minAmount: 20,
  },
]

// Bakiye geçmişi için örnek veriler
const balanceHistory = [
  {
    id: 'txn-2022001',
    type: 'deposit',
    amount: 100,
    method: 'Papara',
    status: 'completed',
    date: new Date(Date.now() - 3600000 * 24 * 2), // 2 gün önce
  },
  {
    id: 'txn-2022002',
    type: 'spend',
    amount: -15,
    description: 'WhatsApp SMS Siparişi #12345',
    status: 'completed',
    date: new Date(Date.now() - 3600000 * 24), // 1 gün önce
  },
  {
    id: 'txn-2022003',
    type: 'spend',
    amount: -12,
    description: 'Gmail SMS Siparişi #12346',
    status: 'completed',
    date: new Date(Date.now() - 3600000 * 12), // 12 saat önce
  },
  {
    id: 'txn-2022004',
    type: 'deposit',
    amount: 50,
    method: 'Havale / EFT',
    status: 'pending',
    date: new Date(Date.now() - 3600000 * 6), // 6 saat önce
  },
  {
    id: 'txn-2022005',
    type: 'deposit',
    amount: 200,
    method: 'Kredi Kartı',
    status: 'completed',
    date: new Date(Date.now() - 3600000 * 3), // 3 saat önce
  },
  {
    id: 'txn-2022006',
    type: 'spend',
    amount: -5,
    description: 'Instagram SMS Siparişi #12347',
    status: 'completed',
    date: new Date(Date.now() - 3600000 * 1), // 1 saat önce
  },
]

export default function Wallet() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [amount, setAmount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [currentBalance, setCurrentBalance] = useState(318)
  
  // Ödeme işlemini simüle et
  const handlePayment = async () => {
    if (!selectedMethod || amount <= 0) {
      alert('Lütfen bir ödeme yöntemi seçin ve geçerli bir tutar girin.')
      return
    }
    
    const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod)
    if (!selectedPaymentMethod) return
    
    // Minimum tutar kontrolü
    if (amount < selectedPaymentMethod.minAmount) {
      alert(`Minimum tutar: ${selectedPaymentMethod.minAmount}₺`)
      return
    }
    
    setLoading(true)
    
    // Ödeme işlemini simüle et
    setTimeout(() => {
      setShowPaymentDetails(true)
      setLoading(false)
    }, 1500)
  }
  
  // Bakiye geçmişi için renk sınıfları
  const getTransactionColorClass = (type: string, status: string) => {
    if (status === 'pending') return 'text-yellow-600 dark:text-yellow-400'
    if (type === 'deposit') return 'text-green-600 dark:text-green-400'
    if (type === 'spend') return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }
  
  // Tarih formatı
  const formatDate = (date: Date) => {
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  
  // İşlem tipi metni
  const getTransactionTypeText = (type: string) => {
    if (type === 'deposit') return 'Yükleme'
    if (type === 'spend') return 'Harcama'
    return type
  }
  
  // İşlem durumu metni ve renk sınıfı
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı'
      case 'pending':
        return 'Beklemede'
      case 'failed':
        return 'Başarısız'
      default:
        return status
    }
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Bakiye İşlemleri</h1>
      
      {/* Bakiye Durum */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Mevcut Bakiyeniz</h2>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white text-opacity-80 mb-1">Mevcut Bakiye</p>
              <p className="text-white text-3xl font-bold">{currentBalance.toFixed(2)}₺</p>
            </div>
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bakiye Yükleme */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Bakiye Yükle</h2>
        </div>
        <div className="p-4">
          {!showPaymentDetails ? (
            <>
              {/* Tutar */}
              <div className="mb-6">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Yüklenecek Tutar (₺)
                </label>
                <input
                  type="number"
                  id="amount"
                  min="10"
                  step="5"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              
              {/* Hızlı Tutar Seçenekleri */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[50, 100, 200, 500].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`py-2 rounded-md border ${
                      amount === value
                        ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setAmount(value)}
                  >
                    {value}₺
                  </button>
                ))}
              </div>
              
              {/* Ödeme Yöntemleri */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ödeme Yöntemi
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mr-3">
                          {/* SVG iconları yerine metinleri kullanıyoruz */}
                          {method.id === 'papara' && <span className="font-bold text-blue-600">P</span>}
                          {method.id === 'credit-card' && <span className="font-bold text-green-600">CC</span>}
                          {method.id === 'havale' && <span className="font-bold text-yellow-600">B</span>}
                          {method.id === 'crypto' && <span className="font-bold text-purple-600">₿</span>}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{method.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {method.description}
                          </p>
                          <div className="mt-1 flex items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Min: {method.minAmount}₺ | Komisyon: {method.fees}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Devam Butonu */}
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePayment}
                  disabled={loading || !selectedMethod || amount <= 0}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      İşleniyor...
                    </>
                  ) : (
                    'Ödeme Yap'
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Ödeme Talimatları</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {amount}₺ tutarındaki ödemeniz için aşağıdaki adımları izleyin
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                {selectedMethod === 'papara' && (
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Papara ile Ödeme</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Papara Numarası: <span className="font-mono font-medium">1234567890</span></p>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Ad Soyad: <span className="font-medium">SMS Onay Panel</span></p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Açıklama: <span className="font-mono font-medium">Bakiye-{new Date().getTime().toString().substring(8, 13)}</span></p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">Ödeme yaptıktan sonra otomatik olarak bakiyenize yansıyacaktır.</p>
                  </div>
                )}
                
                {selectedMethod === 'credit-card' && (
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-4">Kredi Kartı Ödemesi</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kart Üzerindeki İsim</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                          placeholder="Adınız Soyadınız"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kart Numarası</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Son Kullanma Tarihi</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Ödemeyi Tamamla
                      </button>
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Ödeme işleminiz 256bit SSL ile korunmaktadır.
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedMethod === 'havale' && (
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Havale / EFT Bilgileri</p>
                    <div className="space-y-2">
                      <p className="text-gray-600 dark:text-gray-400">Banka: <span className="font-medium">Garanti Bankası</span></p>
                      <p className="text-gray-600 dark:text-gray-400">Şube Kodu: <span className="font-medium">123</span></p>
                      <p className="text-gray-600 dark:text-gray-400">Hesap Sahibi: <span className="font-medium">SMS Onay Panel Ltd. Şti.</span></p>
                      <p className="text-gray-600 dark:text-gray-400">IBAN: <span className="font-mono font-medium">TR12 3456 7890 1234 5678 9012 34</span></p>
                      <p className="text-gray-600 dark:text-gray-400">Açıklama: <span className="font-mono font-medium">Bakiye-{new Date().getTime().toString().substring(8, 13)}</span></p>
                    </div>
                    <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        Ödemeniz banka hesabımıza geçtikten sonra bakiyeniz otomatik olarak güncellenecektir. Mesai saatleri içinde genellikle 15-30 dakika içinde, mesai saatleri dışında ise bir sonraki iş günü işleme alınacaktır.
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedMethod === 'crypto' && (
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Kripto Para ile Ödeme</p>
                    <div className="mb-4">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Bitcoin (BTC) Adresi:</p>
                      <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-md">
                        <p className="font-mono text-sm break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Ethereum (ETH) Adresi:</p>
                      <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-md">
                        <p className="font-mono text-sm break-all">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        Ödeme yaptıktan sonra işlem hash'ini destek ekibimize iletmeniz gerekmektedir. 3 onay alındıktan sonra bakiyenize yansıtılacaktır.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setShowPaymentDetails(false)}
                >
                  Geri Dön
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    setShowPaymentDetails(false)
                    setAmount(0)
                    setSelectedMethod(null)
                  }}
                >
                  Tamam
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Bakiye Geçmişi */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Bakiye Geçmişi</h2>
        </div>
        <div className="p-4">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {balanceHistory.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className={`mt-1 rounded-full p-2 ${
                      transaction.type === 'deposit'
                        ? 'bg-green-100 dark:bg-green-900/20'
                        : 'bg-red-100 dark:bg-red-900/20'
                    }`}>
                      {transaction.type === 'deposit' ? (
                        <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      )}
                    </div>
                    
                    <div className="ml-3">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.type === 'deposit' 
                            ? `Bakiye Yükleme (${transaction.method})`
                            : transaction.description}
                        </span>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                          {getStatusText(transaction.status)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`text-base font-medium ${getTransactionColorClass(transaction.type, transaction.status)}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}₺
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              className="w-full py-2 text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
              onClick={() => {
                // Daha fazla geçmiş yükleme işlemi
              }}
            >
              Daha Fazla Göster
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 