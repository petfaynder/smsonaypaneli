'use client';

import { useState, useEffect, useRef } from 'react';
import { IconBell, IconX } from '@tabler/icons-react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'dashboard' | 'notification';
  active: boolean;
  createdAt: string;
}

export default function NotificationAnnouncement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // API'den duyuruları çekmek yerine örnek duyurular gösterelim
    setAnnouncements([
      {
        id: 1,
        title: 'Yeni Özellik',
        content: 'WhatsApp doğrulama hizmeti artık kullanımda!',
        type: 'notification',
        active: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Bakım Duyurusu',
        content: 'Sistemimiz 15.05.2024 tarihinde bakımda olacaktır.',
        type: 'notification',
        active: true,
        createdAt: new Date(Date.now() - 86400000).toISOString() // 1 gün önce
      }
    ]);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Okunmamış bildirim sayısını hesapla
    setUnreadCount(announcements.length);
  }, [announcements]);

  useEffect(() => {
    // Panel dışına tıklandığında paneli kapat
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = (id: number) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  if (loading) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bildirim ikonu */}
      <button 
        onClick={toggleDropdown}
        className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <IconBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Bildirim paneli */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Bildirimler</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {announcements.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Bildirim bulunmuyor
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0">
                        <IconBell className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                          {announcement.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {announcement.content}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {new Date(announcement.createdAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleClose(announcement.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <IconX className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 