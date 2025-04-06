'use client';

import Link from 'next/link';
import { FiGithub, FiMail, FiExternalLink } from 'react-icons/fi';
import { getCurrentVersion } from '@/lib/update';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appVersion = getCurrentVersion();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} SMS Onay Paneli. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Versiyon: {appVersion}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
            <nav className="flex space-x-6">
              <Link 
                href="/about" 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Hakkında
              </Link>
              <Link 
                href="/privacy" 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Gizlilik
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Şartlar
              </Link>
              <Link 
                href="/faq" 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                SSS
              </Link>
            </nav>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href="https://github.com/username/smsonaypanelyazilimi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5" />
            </a>
            <a 
              href="mailto:info@example.com" 
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Email"
            >
              <FiMail className="h-5 w-5" />
            </a>
            <a 
              href="https://example.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Website"
            >
              <FiExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 