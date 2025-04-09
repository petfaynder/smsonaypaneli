'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/context/ThemeContext'
import NotificationAnnouncement from '@/components/NotificationAnnouncement'

// İkonu temsil eden basit bileşenler
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
  </svg>
)

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

const ProfileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </svg>
)

const SupportIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
)

const ApiIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
  </svg>
)

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
  </svg>
)

const menuItems = [
  { name: 'Ana Sayfa', href: '/dashboard', icon: DashboardIcon },
  { name: 'Siparişlerim', href: '/dashboard/orders', icon: OrdersIcon },
  { name: 'Bakiye İşlemleri', href: '/dashboard/wallet', icon: WalletIcon },
  { name: 'Profil', href: '/dashboard/profile', icon: ProfileIcon },
  { name: 'API Erişimi', href: '/dashboard/api', icon: ApiIcon },
  { name: 'Destek', href: '/dashboard/support', icon: SupportIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Kullanıcı bilgileri
  const user = {
    name: 'Demo Kullanıcı',
    email: 'demo@example.com',
    balance: 125.50,
    activeOrders: 2,
    orderCount: 58,
    ticketCount: 0 
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Üst menü */}
      <header className="bg-purple-700 dark:bg-purple-900 text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/dashboard" className="text-xl font-bold flex items-center">
              <span className="bg-white text-purple-700 px-2 py-1 rounded font-bold mr-1">SMS</span>
              <span>Onay Panel</span>
            </Link>

            {/* Ana Menü - Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/dashboard'
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-100 hover:bg-purple-600'
                }`}
              >
                Ana Sayfa
              </Link>
              <Link 
                href="/dashboard/orders" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/dashboard/orders'
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-100 hover:bg-purple-600'
                }`}
              >
                Siparişlerim
              </Link>
              <Link 
                href="/dashboard/wallet" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/dashboard/wallet'
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-100 hover:bg-purple-600'
                }`}
              >
                Bakiye
              </Link>
              <Link 
                href="/dashboard/profile" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/dashboard/profile'
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-100 hover:bg-purple-600'
                }`}
              >
                Profil
              </Link>
              <Link 
                href="/dashboard/api" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/dashboard/api'
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-100 hover:bg-purple-600'
                }`}
              >
                API
              </Link>
              <Link 
                href="/dashboard/support" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/dashboard/support'
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-100 hover:bg-purple-600'
                }`}
              >
                Destek
              </Link>
            </nav>

            {/* Kullanıcı alanı */}
            <div className="flex items-center">
              {/* Bildirimler */}
              <div className="mr-4">
                <NotificationAnnouncement />
              </div>

              {/* Bakiye */}
              <div className="hidden md:flex items-center mr-4 bg-purple-600 rounded-full px-3 py-1">
                <span className="text-xs text-purple-200 mr-1">Bakiye:</span>
                <span className="text-sm font-bold text-white">{user.balance.toFixed(2)} ₺</span>
                <Link 
                  href="/dashboard/wallet" 
                  className="ml-2 text-xs bg-white text-purple-700 px-2 py-0.5 rounded-full hover:bg-purple-100"
                >
                  Yükle
                </Link>
              </div>

              {/* Profil */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-800 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:block ml-2 text-sm text-white">
                  {user.name}
                </span>
              </div>

              {/* Mobil menü butonu */}
              <button 
                className="ml-4 md:hidden p-2 rounded-md text-purple-300 hover:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobil Menü */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-purple-600 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/dashboard" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/dashboard'
                ? 'bg-purple-700 text-white'
                : 'text-purple-100 hover:bg-purple-500'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Ana Sayfa
          </Link>
          <Link 
            href="/dashboard/orders" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/dashboard/orders'
                ? 'bg-purple-700 text-white'
                : 'text-purple-100 hover:bg-purple-500'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Siparişlerim
          </Link>
          <Link 
            href="/dashboard/wallet" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/dashboard/wallet'
                ? 'bg-purple-700 text-white'
                : 'text-purple-100 hover:bg-purple-500'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Bakiye İşlemleri
          </Link>
          <Link 
            href="/dashboard/profile" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/dashboard/profile'
                ? 'bg-purple-700 text-white'
                : 'text-purple-100 hover:bg-purple-500'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Profil
          </Link>
          <Link 
            href="/dashboard/api" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/dashboard/api'
                ? 'bg-purple-700 text-white'
                : 'text-purple-100 hover:bg-purple-500'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            API Erişimi
          </Link>
          <Link 
            href="/dashboard/support" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/dashboard/support'
                ? 'bg-purple-700 text-white'
                : 'text-purple-100 hover:bg-purple-500'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Destek
          </Link>
          <Link 
            href="/auth/logout" 
            className="block px-3 py-2 rounded-md text-base font-medium text-red-100 hover:bg-red-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Çıkış Yap
          </Link>
        </div>
      </div>

      {/* Üst bilgi çubuğu */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium text-gray-900 dark:text-white">
              {pathname === '/dashboard' ? 'Ana Sayfa' : 
               pathname === '/dashboard/orders' ? 'Siparişlerim' :
               pathname === '/dashboard/wallet' ? 'Bakiye İşlemleri' :
               pathname === '/dashboard/profile' ? 'Profil' :
               pathname === '/dashboard/api' ? 'API Erişimi' :
               pathname === '/dashboard/support' ? 'Destek' : 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-2 text-sm">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <Link 
                href="/auth/logout" 
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ana içerik */}
      <main className="container mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  )
} 