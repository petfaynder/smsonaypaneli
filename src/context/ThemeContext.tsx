'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {mounted && children}
    </NextThemeProvider>
  );
};

export const useTheme = () => {
  const { theme, setTheme } = require('next-themes');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    toggleTheme,
  };
};

export default ThemeContext; 