'use client'

import { useState } from 'react'

// Sık sorulan sorular
const faqs = [
  {
    id: 1,
    question: 'Sipariş verdiğim numara için SMS almadım. Ne yapmalıyım?',
    answer: 'SMS genellikle 5-15 dakika içerisinde gelir. Bu süre servis sağlayıcıya göre değişebilir. Eğer 20 dakikadan fazla beklediyseniz, sipariş iptal edebilir ve yeni bir numara talep edebilirsiniz. İptal edilen siparişler için bakiyeniz iade edilecektir.',
  },
  {
    id: 2,
    question: 'Bakiyemi nasıl yüklerim?',
    answer: 'Bakiye yüklemek için Bakiye sayfasına gidin ve istediğiniz ödeme yöntemini seçin. Papara, banka havalesi, kredi kartı ve kripto para ile ödeme yapabilirsiniz. Her ödeme yöntemi için minimum tutar değişmektedir.',
  },
  {
    id: 3,
    question: 'Numara tekrar kullanılabilir mi?',
    answer: 'Hayır, her numara yalnızca bir kez ve belirli bir süre için kullanılabilir. Numaralar süresi dolduktan sonra başka kullanıcılara tahsis edilebilir, bu nedenle aynı numarayı tekrar kullanmanızı önermiyoruz.',
  },
  {
    id: 4,
    question: 'Hangi ülkelerden numara alabilirim?',
    answer: 'Şu anda Türkiye, Amerika, Rusya, İngiltere ve Almanya\'dan numara alabilirsiniz. Yakında daha fazla ülke eklenecektir.',
  },
  {
    id: 5,
    question: 'İşlem geçmişimi nasıl görebilirim?',
    answer: 'Siparişler sayfasında tüm SMS siparişlerinizi görebilirsiniz. Bakiye sayfasında ise bakiye yükleme ve harcama işlemlerinizi takip edebilirsiniz.',
  },
]

// Örnek destek talepleri
const supportTickets = [
  {
    id: 'TIC-2023001',
    subject: 'SMS gelmiyor',
    message: 'Merhaba, WhatsApp için aldığım numaraya SMS gelmiyor. 20 dakikadır bekliyorum.',
    status: 'answered',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2), // 2 gün önce
    updatedAt: new Date(Date.now() - 3600000 * 24), // 1 gün önce
    replies: [
      {
        id: 'REP-1',
        from: 'support',
        message: 'Merhaba, siparişinizi kontrol ettik. WhatsApp\'ın yoğunluk nedeniyle SMS göndermesi gecikebiliyor. Bu durumda 30 dakika daha beklemenizi veya siparişi iptal edip yeni bir numara almanızı öneriyoruz.',
        createdAt: new Date(Date.now() - 3600000 * 24),
      },
      {
        id: 'REP-2',
        from: 'user',
        message: 'Teşekkürler, biraz daha bekleyeceğim.',
        createdAt: new Date(Date.now() - 3600000 * 24 + 1800000),
      }
    ]
  },
  {
    id: 'TIC-2023002',
    subject: 'Bakiye yükleme sorunu',
    message: 'Papara ile bakiye yükledim fakat hesabıma geçmedi. Referans numaram: PAP123456',
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 5), // 5 saat önce
    updatedAt: new Date(Date.now() - 3600000 * 5),
    replies: []
  }
]

export default function Support() {
  const [tickets, setTickets] = useState(supportTickets)
  const [activeTicket, setActiveTicket] = useState<typeof supportTickets[0] | null>(null)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
  })
  const [replyMessage, setReplyMessage] = useState('')
  const [showNewTicketForm, setShowNewTicketForm] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  
  // FAQ açıp kapatma
  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }
  
  // Yeni destek talebi oluşturma
  const handleNewTicket = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newTicket.subject || !newTicket.message) {
      alert('Lütfen tüm alanları doldurun.')
      return
    }
    
    // Yeni talep oluştur
    const ticket = {
      id: `TIC-${new Date().getFullYear()}${Math.floor(Math.random() * 1000)}`,
      subject: newTicket.subject,
      message: newTicket.message,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      replies: [],
    }
    
    setTickets([ticket, ...tickets])
    setNewTicket({ subject: '', message: '' })
    setShowNewTicketForm(false)
    setActiveTicket(ticket)
  }
  
  // Yanıt gönderme
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!replyMessage || !activeTicket) return
    
    const reply = {
      id: `REP-${new Date().getTime()}`,
      from: 'user',
      message: replyMessage,
      createdAt: new Date(),
    }
    
    // Talebi güncelle
    const updatedTickets = tickets.map(ticket => 
      ticket.id === activeTicket.id
        ? {
            ...ticket,
            replies: [...ticket.replies, reply],
            updatedAt: new Date(),
            status: 'updated',
          }
        : ticket
    )
    
    setTickets(updatedTickets)
    setReplyMessage('')
    
    // Aktif ticket'ı güncelle
    const updatedTicket = updatedTickets.find(t => t.id === activeTicket.id)
    if (updatedTicket) {
      setActiveTicket(updatedTicket)
    }
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
  
  // Duruma göre etiket rengi
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'answered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      case 'updated':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }
  
  // Durum metni
  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Açık'
      case 'answered':
        return 'Yanıtlandı'
      case 'closed':
        return 'Kapatıldı'
      case 'updated':
        return 'Güncellendi'
      default:
        return status
    }
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Destek</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* SSS Bölümü */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Sık Sorulan Sorular</h2>
            </div>
            <div className="p-4">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-6">
                    <button
                      className="flex justify-between items-center w-full text-left focus:outline-none"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform ${
                          expandedFAQ === faq.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* İletişim Bilgileri */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">İletişim Bilgileri</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">E-posta</p>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">support@smsonay.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">Canlı Destek</p>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                      Her gün 10:00 - 18:00 arasında aktif
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">Telefon</p>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">+90 (212) 123 45 67</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Destek Talepleri Bölümü */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Destek Taleplerim</h2>
            </div>
            <div className="p-4">
              {/* Destek Talepleri */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Destek Taleplerim</h2>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {
                      setShowNewTicketForm(true)
                      setActiveTicket(null)
                    }}
                  >
                    Yeni Talep Oluştur
                  </button>
                </div>
                
                <div>
                  {/* Yeni Talep Formu */}
                  {showNewTicketForm && (
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Yeni Destek Talebi</h3>
                      <form onSubmit={handleNewTicket}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Konu
                            </label>
                            <input
                              type="text"
                              id="subject"
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                              placeholder="Destek talebinizin konusu"
                              value={newTicket.subject}
                              onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Mesaj
                            </label>
                            <textarea
                              id="message"
                              rows={5}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                              placeholder="Sorunuzu detaylı bir şekilde açıklayın"
                              value={newTicket.message}
                              onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                              required
                            />
                          </div>
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              onClick={() => setShowNewTicketForm(false)}
                            >
                              İptal
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Gönder
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  
                  {/* Destek Talebi Detayı */}
                  {activeTicket && !showNewTicketForm && (
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {activeTicket.subject}
                            </h3>
                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(activeTicket.status)}`}>
                              {getStatusText(activeTicket.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Talep numarası: {activeTicket.id} • Oluşturulma: {formatDate(activeTicket.createdAt)}
                          </p>
                        </div>
                        <button
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => setActiveTicket(null)}
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {/* İlk mesaj */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <span className="text-blue-600 dark:text-blue-300 font-medium">
                                  {activeTicket.subject.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Siz</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(activeTicket.createdAt)}</p>
                              <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                <p>{activeTicket.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Yanıtlar */}
                        {activeTicket.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`${
                              reply.from === 'support'
                                ? 'bg-blue-50 dark:bg-blue-900/20'
                                : 'bg-gray-50 dark:bg-gray-700'
                            } p-4 rounded-lg`}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <div className={`h-10 w-10 rounded-full ${
                                  reply.from === 'support'
                                    ? 'bg-blue-600 dark:bg-blue-800'
                                    : 'bg-blue-100 dark:bg-blue-900'
                                } flex items-center justify-center`}>
                                  <span className={`${
                                    reply.from === 'support'
                                      ? 'text-white'
                                      : 'text-blue-600 dark:text-blue-300'
                                  } font-medium`}>
                                    {reply.from === 'support' ? 'D' : 'S'}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {reply.from === 'support' ? 'Destek Ekibi' : 'Siz'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(reply.createdAt)}</p>
                                <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                                  <p>{reply.message}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Yanıt formu */}
                        {activeTicket.status !== 'closed' && (
                          <form onSubmit={handleSendReply} className="mt-6">
                            <label htmlFor="reply" className="sr-only">Yanıtınız</label>
                            <textarea
                              id="reply"
                              rows={3}
                              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                              placeholder="Yanıtınızı yazın..."
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              required
                            />
                            <div className="mt-3 flex justify-end">
                              <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Yanıt Gönder
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Destek Talepleri Listesi */}
                  {!showNewTicketForm && !activeTicket && (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {tickets.length > 0 ? (
                        tickets.map((ticket) => (
                          <div
                            key={ticket.id}
                            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => setActiveTicket(ticket)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                    {ticket.subject}
                                  </h3>
                                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(ticket.status)}`}>
                                    {getStatusText(ticket.status)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  Talep numarası: {ticket.id}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  Son güncelleme: {formatDate(ticket.updatedAt)}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {ticket.replies.length} yanıt
                                </span>
                                <svg className="ml-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center">
                          <p className="text-gray-500 dark:text-gray-400">Henüz destek talebiniz bulunmuyor.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 