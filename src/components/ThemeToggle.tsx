'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <span className="sr-only">Temayı değiştir</span>
      {theme === 'dark' ? (
        <IconSun className="h-6 w-6" />
      ) : (
        <IconMoon className="h-6 w-6" />
      )}
    </button>
  );
} 