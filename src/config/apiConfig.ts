import { ApiConfig, SmsApiProvider } from '@/types/smsApi';

// API konfigürasyonları
export const defaultApiConfigs: ApiConfig[] = [
  {
    provider: SmsApiProvider.SMS_ACTIVATE,
    apiKey: process.env.SMS_ACTIVATE_API_KEY || '',
    baseUrl: 'https://api.sms-activate.org/stubs/handler_api.php',
    active: true,
    priority: 1
  },
  {
    provider: SmsApiProvider.SMSPVA,
    apiKey: process.env.SMSPVA_API_KEY || '',
    baseUrl: 'https://smspva.com/priemnik.php',
    active: false,
    priority: 2
  },
  {
    provider: SmsApiProvider.SMSREG,
    apiKey: process.env.SMSREG_API_KEY || '',
    baseUrl: 'https://api.sms-reg.com',
    active: false,
    priority: 3
  },
];

// API yanıt kodları (SMS-Activate için)
export const SMS_ACTIVATE_STATUS_CODES = {
  // Genel durum kodları
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  
  // Numara alımı ve durum kodları
  ACCESS_READY: 'ACCESS_READY',
  ACCESS_RETRY_GET: 'ACCESS_RETRY_GET',
  ACCESS_ACTIVATION: 'ACCESS_ACTIVATION',
  ACCESS_CANCEL: 'ACCESS_CANCEL',
  
  // Durum yanıtları
  STATUS_WAIT_CODE: 'STATUS_WAIT_CODE',
  STATUS_WAIT_RETRY: 'STATUS_WAIT_RETRY',
  STATUS_WAIT_RESEND: 'STATUS_WAIT_RESEND',
  STATUS_CANCEL: 'STATUS_CANCEL',
  STATUS_OK: 'STATUS_OK',
}; 