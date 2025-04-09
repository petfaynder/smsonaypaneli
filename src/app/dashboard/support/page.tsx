'use client'

import { useState, useEffect } from 'react'
import { IconRobot, IconSend, IconRefresh } from '@tabler/icons-react'

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
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isLoadingAi, setIsLoadingAi] = useState(false)
  
  // FAQ açıp kapatma
  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }
  
  // AI'dan yanıt önerileri alma
  const fetchAiSuggestions = async (message: string) => {
    if (!message.trim()) return;
    
    setIsLoadingAi(true);
    try {
      const response = await fetch('/api/support/ai-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        throw new Error('AI önerileri alınamadı');
      }
      
      const data = await response.json();
      setAiSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('AI önerileri alınırken hata:', error);
      setAiSuggestions([]);
    } finally {
      setIsLoadingAi(false);
    }
  };
  
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
    
    // AI önerileri al
    fetchAiSuggestions(newTicket.message);
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
    
    // Yanıtı ekle
    const updatedTicket = {
      ...activeTicket,
      replies: [...activeTicket.replies, reply],
      updatedAt: new Date(),
    }
    
    // Ticket'ı güncelle
    setTickets(tickets.map(t => t.id === activeTicket.id ? updatedTicket : t))
    setActiveTicket(updatedTicket)
    setReplyMessage('')
    
    // AI önerileri al
    fetchAiSuggestions(replyMessage);
  }
  
  // AI önerisini kullan
  const useAiSuggestion = (suggestion: string) => {
    setReplyMessage(suggestion);
  }
  
  // Mesaj değiştiğinde AI önerileri al
  useEffect(() => {
    if (replyMessage.length > 20) {
      const timer = setTimeout(() => {
        fetchAiSuggestions(replyMessage);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [replyMessage]);
  
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Destek Merkezi</h1>
        <button
          onClick={() => setShowNewTicketForm(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Yeni Destek Talebi
        </button>
      </div>

      {/* Yeni Destek Talebi Formu */}
      {showNewTicketForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Yeni Destek Talebi</h2>
          <form onSubmit={handleNewTicket}>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Konu
              </label>
              <input
                type="text"
                id="subject"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Destek talebinizin konusu"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mesaj
              </label>
              <textarea
                id="message"
                rows={4}
                value={newTicket.message}
                onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Sorununuzu detaylı bir şekilde açıklayın"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewTicketForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Destek Talepleri Listesi */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Destek Taleplerim</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {tickets.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">
              Henüz bir destek talebiniz bulunmuyor.
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${
                  activeTicket?.id === ticket.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setActiveTicket(ticket)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-1">{ticket.message}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(ticket.status)}`}>
                      {getStatusText(ticket.status)}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Aktif Destek Talebi Detayı */}
      {activeTicket && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">{activeTicket.subject}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(activeTicket.status)}`}>
                {getStatusText(activeTicket.status)}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Oluşturulma: {formatDate(activeTicket.createdAt)} | Son Güncelleme: {formatDate(activeTicket.updatedAt)}
            </p>
          </div>
          <div className="px-6 py-4">
            <div className="mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">S</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-900">{activeTicket.message}</p>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{formatDate(activeTicket.createdAt)}</p>
                </div>
              </div>
            </div>
            
            {/* Yanıtlar */}
            {activeTicket.replies.map((reply) => (
              <div key={reply.id} className="mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      reply.from === 'user' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <span className={`font-medium ${
                        reply.from === 'user' ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {reply.from === 'user' ? 'S' : 'D'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className={`rounded-lg p-4 ${
                      reply.from === 'user' ? 'bg-blue-50' : 'bg-green-50'
                    }`}>
                      <p className="text-sm text-gray-900">{reply.message}</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{formatDate(reply.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Yanıt Formu */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Yanıt Gönder</h3>
              <form onSubmit={handleSendReply}>
                <div className="mb-4">
                  <textarea
                    rows={3}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Yanıtınızı yazın..."
                  />
                </div>
                
                {/* AI Önerileri */}
                {aiSuggestions.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <IconRobot className="h-5 w-5 text-blue-500 mr-1" />
                      <h4 className="text-sm font-medium text-gray-900">AI Önerileri</h4>
                    </div>
                    <div className="space-y-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <div 
                          key={index} 
                          className="p-3 bg-blue-50 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-blue-100"
                          onClick={() => useAiSuggestion(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!replyMessage.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <IconSend className="h-4 w-4 mr-2" />
                    Gönder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Sık Sorulan Sorular */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Sık Sorulan Sorular</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq) => (
            <div key={faq.id} className="px-6 py-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h3 className="text-sm font-medium text-gray-900">{faq.question}</h3>
                <svg
                  className={`h-5 w-5 text-gray-500 transform ${
                    expandedFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {expandedFAQ === faq.id && (
                <div className="mt-2 text-sm text-gray-500">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 