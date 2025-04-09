'use client';

import { useState, useEffect } from 'react';
import { 
  IconMessage, 
  IconCheck, 
  IconX, 
  IconRobot, 
  IconSearch, 
  IconFilter,
  IconClock,
  IconUser,
  IconMail,
  IconCalendar
} from '@tabler/icons-react';

interface Ticket {
  id: number;
  userId: number;
  user: {
    name: string;
    email: string;
  };
  subject: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

interface Message {
  id: number;
  ticketId: number;
  userId: number;
  content: string;
  createdAt: string;
  isAiGenerated?: boolean;
}

export default function SupportManagementPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/support/tickets');
      if (!response.ok) {
        throw new Error('Destek talepleri alınamadı');
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Destek talepleri alınırken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setReplyMessage('');
    setAiSuggestions([]);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTicket || !replyMessage.trim()) return;
    
    try {
      const response = await fetch(`/api/admin/support/tickets/${selectedTicket.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyMessage }),
      });
      
      if (!response.ok) {
        throw new Error('Yanıt gönderilemedi');
      }
      
      // Yanıtı ekle
      const newMessage = {
        id: Date.now(), // Geçici ID
        ticketId: selectedTicket.id,
        userId: 0, // Admin ID
        content: replyMessage,
        createdAt: new Date().toISOString(),
      };
      
      const updatedTicket = {
        ...selectedTicket,
        messages: [...selectedTicket.messages, newMessage],
        updatedAt: new Date().toISOString(),
      };
      
      setSelectedTicket(updatedTicket);
      setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
      setReplyMessage('');
      setAiSuggestions([]);
    } catch (error) {
      console.error('Yanıt gönderilirken hata oluştu:', error);
    }
  };

  const handleCloseTicket = async () => {
    if (!selectedTicket) return;
    
    try {
      const response = await fetch(`/api/admin/support/tickets/${selectedTicket.id}/close`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Talep kapatılamadı');
      }
      
      // Talebi güncelle
      const updatedTicket = {
        ...selectedTicket,
        status: 'closed',
        updatedAt: new Date().toISOString(),
      };
      
      setSelectedTicket(updatedTicket);
      setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
    } catch (error) {
      console.error('Talep kapatılırken hata oluştu:', error);
    }
  };

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

  const useAiSuggestion = (suggestion: string) => {
    setReplyMessage(suggestion);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Açık';
      case 'closed':
        return 'Kapatıldı';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Destek Yönetimi</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Destek Talepleri Listesi */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Destek taleplerinde ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <IconSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="all">Tümü</option>
                  <option value="open">Açık</option>
                  <option value="closed">Kapatılmış</option>
                </select>
                <IconFilter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-sm text-gray-500">Yükleniyor...</p>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Destek talebi bulunamadı.
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedTicket?.id === ticket.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleSelectTicket(ticket)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <IconUser className="h-4 w-4 mr-1" />
                        <span>{ticket.user.name}</span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(ticket.status)}`}>
                      {getStatusText(ticket.status)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <IconCalendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(ticket.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Destek Talebi Detayı */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          {selectedTicket ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{selectedTicket.subject}</h2>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <IconUser className="h-4 w-4 mr-1" />
                      <span>{selectedTicket.user.name}</span>
                      <span className="mx-2">•</span>
                      <IconMail className="h-4 w-4 mr-1" />
                      <span>{selectedTicket.user.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedTicket.status)}`}>
                      {getStatusText(selectedTicket.status)}
                    </span>
                    {selectedTicket.status === 'open' && (
                      <button
                        onClick={handleCloseTicket}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <IconX className="h-4 w-4 mr-1" />
                        Talebi Kapat
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-400px)]">
                {selectedTicket.messages.map((message) => (
                  <div key={message.id} className="mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          message.userId === 0 ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <span className={`font-medium ${
                            message.userId === 0 ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {message.userId === 0 ? 'A' : 'K'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className={`rounded-lg p-3 ${
                          message.userId === 0 ? 'bg-blue-50' : 'bg-gray-50'
                        }`}>
                          <p className="text-sm text-gray-900">{message.content}</p>
                          {message.isAiGenerated && (
                            <div className="mt-1 flex items-center text-xs text-blue-600">
                              <IconRobot className="h-3 w-3 mr-1" />
                              <span>AI tarafından oluşturuldu</span>
                            </div>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{formatDate(message.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedTicket.status === 'open' && (
                <div className="p-4 border-t border-gray-200">
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
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => fetchAiSuggestions(selectedTicket.messages[selectedTicket.messages.length - 1]?.content || '')}
                        disabled={isLoadingAi || !selectedTicket.messages.length}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoadingAi ? (
                          <>
                            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                            Yükleniyor...
                          </>
                        ) : (
                          <>
                            <IconRobot className="h-4 w-4 mr-2" />
                            AI Önerisi Al
                          </>
                        )}
                      </button>
                      <button
                        type="submit"
                        disabled={!replyMessage.trim()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <IconCheck className="h-4 w-4 mr-2" />
                        Yanıt Gönder
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center">
                <IconMessage className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Destek Talebi Seçilmedi</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Detayları görüntülemek için sol taraftan bir destek talebi seçin.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 