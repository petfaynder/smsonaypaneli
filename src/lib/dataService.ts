/**
 * Ülke ve servis verilerini yöneten servis
 */

import { getSmsService } from '@/lib/services/smsService';
import { SmsApiProvider, Country as ApiCountry, Service as ApiService } from '@/types/smsApi';

// SMS servisini başlat
const smsService = getSmsService();

// Ülke türü (UI için)
export interface Country {
  id: number;
  code: string;
  name: string;
  flag: string;
  originalName: string;  // JSON'daki orijinal isim
  available?: boolean;
}

// Servis türü (UI için)
export interface Service {
  id: string;
  name: string;
  icon: string;
  price: number;
  shortCode?: string;
  available?: boolean;
  countryPrices: Record<string, number>;
}

// Ülke kodları için eşleştirme tablosu
const countryCodeMap: Record<string, string> = {
  "Russia": "RU",
  "Turkey": "TR",
  "USA": "US",
  "Germany": "DE",
  "England": "GB",
  "China": "CN",
  "India": "IN",
  "Japan": "JP",
  "Spain": "ES",
  "France": "FR",
  "Netherlands": "NL",
  "Ukraine": "UA",
  "Philippines": "PH"
};

// Var olan bayrak SVG'leri
const existingFlagSVGs = [
  'tr', 'us', 'ru', 'de', 'fr', 'nl', 'gb', 'ua', 'cn', 'ph', 'in', 'es', 'jp'
];

// Fallback ülke verileri
const fallbackCountries: Country[] = [
  {
    id: 1,
    code: 'TR',
    name: 'Turkey',
    flag: '/images/flags/tr.svg',
    originalName: 'Turkey',
    available: true
  },
  {
    id: 2,
    code: 'US',
    name: 'USA',
    flag: '/images/flags/us.svg',
    originalName: 'USA',
    available: true
  },
  {
    id: 3,
    code: 'RU',
    name: 'Russia',
    flag: '/images/flags/ru.svg',
    originalName: 'Russia',
    available: true
  },
  {
    id: 4,
    code: 'DE',
    name: 'Germany',
    flag: '/images/flags/de.svg',
    originalName: 'Germany',
    available: true
  },
  {
    id: 5,
    code: 'GB',
    name: 'England',
    flag: '/images/flags/gb.svg',
    originalName: 'England',
    available: true
  },
  {
    id: 6,
    code: 'CN',
    name: 'China',
    flag: '/images/flags/cn.svg',
    originalName: 'China',
    available: true
  },
  {
    id: 7,
    code: 'IN',
    name: 'India',
    flag: '/images/flags/in.svg',
    originalName: 'India',
    available: true
  },
  {
    id: 8,
    code: 'JP',
    name: 'Japan',
    flag: '/images/flags/jp.svg',
    originalName: 'Japan',
    available: true
  },
  {
    id: 9,
    code: 'ES',
    name: 'Spain',
    flag: '/images/flags/es.svg',
    originalName: 'Spain',
    available: true
  },
  {
    id: 10,
    code: 'FR',
    name: 'France',
    flag: '/images/flags/fr.svg',
    originalName: 'France',
    available: true
  },
  {
    id: 11,
    code: 'NL',
    name: 'Netherlands',
    flag: '/images/flags/nl.svg',
    originalName: 'Netherlands',
    available: true
  },
  {
    id: 12,
    code: 'UA',
    name: 'Ukraine',
    flag: '/images/flags/ua.svg',
    originalName: 'Ukraine',
    available: true
  },
  {
    id: 13,
    code: 'PH',
    name: 'Philippines',
    flag: '/images/flags/ph.svg',
    originalName: 'Philippines',
    available: true
  },
  {
    id: 14,
    code: 'BR',
    name: 'Brazil',
    flag: '/images/flags/br.svg',
    originalName: 'Brazil',
    available: true
  },
  {
    id: 15,
    code: 'IT',
    name: 'Italy',
    flag: '/images/flags/it.svg',
    originalName: 'Italy',
    available: true
  },
  {
    id: 16,
    code: 'CA',
    name: 'Canada',
    flag: '/images/flags/ca.svg',
    originalName: 'Canada',
    available: true
  }
];

// Fallback servis verileri
const fallbackServices: Service[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '/images/services/whatsapp.svg',
    price: 2.50,
    available: true,
    countryPrices: { 'TR': 2.50, 'US': 3.00, 'RU': 2.00 }
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '/images/services/telegram.svg',
    price: 3.00,
    available: true,
    countryPrices: { 'TR': 3.00, 'US': 3.50, 'RU': 2.50 }
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: '/images/services/instagram.svg',
    price: 5.00,
    available: true,
    countryPrices: { 'TR': 5.00, 'US': 6.00, 'RU': 4.00 }
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: '/images/services/facebook.svg',
    price: 4.50,
    available: true,
    countryPrices: { 'TR': 4.50, 'US': 5.00, 'RU': 3.50 }
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: '/images/services/gmail.svg',
    price: 3.50,
    available: true,
    countryPrices: { 'TR': 3.50, 'US': 4.00, 'RU': 3.00 }
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: '/images/services/twitter.svg',
    price: 4.00,
    available: true,
    countryPrices: { 'TR': 4.00, 'US': 4.50, 'RU': 3.50 }
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '/images/services/discord.svg',
    price: 3.75,
    available: true,
    countryPrices: { 'TR': 3.75, 'US': 4.25, 'RU': 3.25 }
  },
  {
    id: 'tinder',
    name: 'Tinder',
    icon: '/images/services/tinder.svg',
    price: 5.50,
    available: true,
    countryPrices: { 'TR': 5.50, 'US': 6.50, 'RU': 4.50 }
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: '/images/services/tiktok.svg',
    price: 6.00,
    available: true,
    countryPrices: { 'TR': 6.00, 'US': 7.00, 'RU': 5.00 }
  },
  {
    id: 'amazon',
    name: 'Amazon',
    icon: '/images/services/amazon.svg',
    price: 4.25,
    available: true,
    countryPrices: { 'TR': 4.25, 'US': 4.75, 'RU': 3.75 }
  },
  {
    id: 'netflix',
    name: 'Netflix',
    icon: '/images/services/netflix.svg',
    price: 5.25,
    available: true,
    countryPrices: { 'TR': 5.25, 'US': 6.25, 'RU': 4.25 }
  },
  {
    id: 'google',
    name: 'Google',
    icon: '/images/services/google.svg',
    price: 3.25,
    available: true,
    countryPrices: { 'TR': 3.25, 'US': 3.75, 'RU': 2.75 }
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: '/images/services/microsoft.svg',
    price: 3.50,
    available: true,
    countryPrices: { 'TR': 3.50, 'US': 4.00, 'RU': 3.00 }
  },
  {
    id: 'uber',
    name: 'Uber',
    icon: '/images/services/uber.svg',
    price: 4.75,
    available: true,
    countryPrices: { 'TR': 4.75, 'US': 5.25, 'RU': 4.25 }
  },
  {
    id: 'lyft',
    name: 'Lyft',
    icon: '/images/services/lyft.svg',
    price: 4.50,
    available: true,
    countryPrices: { 'TR': 4.50, 'US': 5.00, 'RU': 4.00 }
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '/images/services/openai.svg',
    price: 5.75,
    available: true,
    countryPrices: { 'TR': 5.75, 'US': 6.75, 'RU': 4.75 }
  },
  {
    id: 'doordash',
    name: 'Doordash',
    icon: '/images/services/doordash.svg',
    price: 4.50,
    available: true,
    countryPrices: { 'TR': 4.50, 'US': 5.00, 'RU': 4.00 }
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: '/images/services/twitch.svg',
    price: 5.00,
    available: true,
    countryPrices: { 'TR': 5.00, 'US': 6.00, 'RU': 4.00 }
  },
  {
    id: 'icq',
    name: 'ICQ',
    icon: '/images/services/icq.svg',
    price: 3.25,
    available: true,
    countryPrices: { 'TR': 3.25, 'US': 3.75, 'RU': 2.75 }
  },
  {
    id: 'signal',
    name: 'Signal',
    icon: '/images/services/signal.svg',
    price: 3.50,
    available: true,
    countryPrices: { 'TR': 3.50, 'US': 4.00, 'RU': 3.00 }
  },
  {
    id: 'vk',
    name: 'VK',
    icon: '/images/services/vk.svg',
    price: 3.00,
    available: true,
    countryPrices: { 'TR': 3.00, 'US': 3.50, 'RU': 2.50 }
  },
  {
    id: 'aliexpress',
    name: 'Aliexpress',
    icon: '/images/services/aliexpress.svg',
    price: 4.00,
    available: true,
    countryPrices: { 'TR': 4.00, 'US': 4.50, 'RU': 3.50 }
  },
  {
    id: 'threads',
    name: 'Threads',
    icon: '/images/services/threads.svg',
    price: 5.50,
    available: true,
    countryPrices: { 'TR': 5.50, 'US': 6.50, 'RU': 4.50 }
  },
  {
    id: 'bigo',
    name: 'Bigo',
    icon: '/images/services/bigo.svg',
    price: 4.25,
    available: true,
    countryPrices: { 'TR': 4.25, 'US': 4.75, 'RU': 3.75 }
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '/images/services/paypal.svg',
    price: 4.50,
    available: true,
    countryPrices: { 'TR': 4.50, 'US': 5.00, 'RU': 4.00 }
  }
];

/**
 * Ülke listesini getir
 */
export async function getCountries(): Promise<Country[]> {
  try {
    const apiCountries = await smsService.getCountries();
    if (apiCountries && apiCountries.length > 0) {
      return apiCountries.map((country, index) => ({
        id: index + 1,
        code: countryCodeMap[country.name] || country.code,
        name: country.name,
        flag: getCountryFlagUrl(countryCodeMap[country.name] || country.code, country.name),
        originalName: country.name,
        available: country.available
      }));
    } else {
      console.warn('No countries returned from API');
      return [];
    }
  } catch (error) {
    console.error('Ülkeler yüklenirken hata:', error);
    return [];
  }
}

/**
 * Ülke bayrağı URL'sini getir
 */
function getCountryFlagUrl(code: string, name: string): string {
  const lowerCode = code.toLowerCase();
  
  // Flag varsa kullan, yoksa default
  if (existingFlagSVGs.includes(lowerCode)) {
    return `/images/flags/${lowerCode}.svg`;
  }
  
  return `/images/flags/default.svg`;
}

/**
 * Servis listesini getir
 */
export async function getServices(): Promise<Service[]> {
  try {
    const apiServices = await smsService.getServices();
    if (apiServices && apiServices.length > 0) {
      return apiServices.map(service => ({
        id: service.id,
        name: service.name,
        icon: getServiceIconUrl(service.name),
        price: service.price || 0,
        shortCode: service.shortCode,
        available: service.available,
        countryPrices: service.countryPrices
      }));
    } else {
      console.warn('No services returned from API');
      return [];
    }
  } catch (error) {
    console.error('Servisler yüklenirken hata:', error);
    return [];
  }
}

/**
 * Servis ikonu URL'sini getir
 */
function getServiceIconUrl(name: string): string {
  // Servis ismine göre ikon belirleme
  const serviceIcons: Record<string, string> = {
    "WhatsApp": "/images/services/whatsapp.svg",
    "Telegram": "/images/services/telegram.svg",
    "Instagram": "/images/services/instagram.svg",
    "Facebook": "/images/services/facebook.svg",
    "Gmail": "/images/services/gmail.svg",
    "Twitter": "/images/services/twitter.svg",
    "Discord": "/images/services/discord.svg",
    "Tinder": "/images/services/tinder.svg",
    "TikTok": "/images/services/tiktok.svg",
    "Amazon": "/images/services/amazon.svg",
    "Netflix": "/images/services/netflix.svg",
    "Google": "/images/services/google.svg",
    "Microsoft": "/images/services/microsoft.svg",
    "Uber": "/images/services/uber.svg",
    "Lyft": "/images/services/lyft.svg",
    "OpenAI": "/images/services/openai.svg",
    "Doordash": "/images/services/doordash.svg",
    "Twitch": "/images/services/twitch.svg",
    "ICQ": "/images/services/icq.svg",
    "Signal": "/images/services/signal.svg",
    "VK": "/images/services/vk.svg",
    "Aliexpress": "/images/services/aliexpress.svg",
    "Threads": "/images/services/threads.svg",
    "Bigo": "/images/services/bigo.svg",
    "PayPal": "/images/services/paypal.svg"
  };
  
  // Tam isim eşleşmesi varsa o ikonu kullan
  if (serviceIcons[name]) {
    return serviceIcons[name];
  }
  
  // Kısmi eşleşme kontrol et
  for (const [serviceName, iconPath] of Object.entries(serviceIcons)) {
    if (name.toLowerCase().includes(serviceName.toLowerCase())) {
      return iconPath;
    }
  }
  
  // Eşleşme yoksa default ikon
  return "/images/services/default.svg";
}

/**
 * Rastgele fiyat üret (fallback için)
 */
function generateRandomPrice(): number {
  // 0.50$ - 4.50$ arası rastgele fiyat
  return Math.round((Math.random() * 4 + 0.5) * 100) / 100;
} 