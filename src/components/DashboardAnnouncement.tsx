'use client';

import { useState, useEffect } from 'react';
import { IconBell, IconX } from '@tabler/icons-react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: 'dashboard' | 'notification';
  active: boolean;
  createdAt: string;
}

export default function DashboardAnnouncement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [closedAnnouncements, setClosedAnnouncements] = useState<number[]>([]);

  useEffect(() => {
    // API'den duyuruları çekmek yerine örnek bir duyuru gösterelim
    setAnnouncements([
      {
        id: 1,
        title: 'Hoş Geldiniz!',
        content: 'SMS Onay Paneline hoş geldiniz. Yeni özellikler ve güncellemeler hakkında bilgi almak için duyurularımızı takip edin.',
        type: 'dashboard',
        active: true,
        createdAt: new Date().toISOString()
      }
    ]);
    setLoading(false);
  }, []);

  const handleClose = (id: number) => {
    setClosedAnnouncements(prev => [...prev, id]);
  };

  if (loading) {
    return null;
  }

  const visibleAnnouncements = announcements.filter(a => !closedAnnouncements.includes(a.id));

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {visibleAnnouncements.map((announcement) => (
        <div
          key={announcement.id}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm relative"
        >
          <button 
            onClick={() => handleClose(announcement.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <IconX className="h-5 w-5" />
          </button>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <IconBell className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {announcement.title}
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {announcement.content}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {new Date(announcement.createdAt).toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 