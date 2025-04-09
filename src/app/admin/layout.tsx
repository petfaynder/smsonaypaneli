'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconDashboard,
  IconUsers,
  IconMessage,
  IconCreditCard,
  IconSettings,
  IconChartBar,
  IconMenu2,
  IconX,
  IconWallet,
  IconRobot,
  IconHeadset,
  IconBell,
  IconTicket,
  IconReport
} from '@tabler/icons-react';

const menuItems = [
  { title: 'Genel Bakış', href: '/admin', icon: IconDashboard },
  { title: 'Kullanıcılar', href: '/admin/users', icon: IconUsers },
  { title: 'SMS Servisleri', href: '/admin/sms', icon: IconMessage },
  { title: 'Finansal İşlemler', href: '/admin/finance', icon: IconWallet },
  { title: 'Raporlar', href: '/admin/reports', icon: IconChartBar },
  { title: 'Destek Yönetimi', href: '/admin/support', icon: IconHeadset },
  { title: 'Ayarlar', href: '/admin/settings', icon: IconSettings },
  { title: 'AI Ayarları', href: '/admin/settings/ai', icon: IconRobot },
  { title: 'Duyurular', href: '/admin/announcements', icon: IconBell },
  { title: 'Destek Talepleri', href: '/admin/tickets', icon: IconTicket },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        >
          {sidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
} 