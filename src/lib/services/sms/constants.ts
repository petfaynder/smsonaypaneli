import { SmsApiConfig, SmsApiProvider } from './types';

export const SMS_API_CONFIGS: Record<SmsApiProvider, SmsApiConfig> = {
  [SmsApiProvider.SMS_ACTIVATE]: {
    apiKey: process.env.NEXT_PUBLIC_SMS_ACTIVATE_API_KEY || '',
    baseUrl: 'https://api.sms-activate.org/stubs/handler_api.php'
  },
  [SmsApiProvider.FIVE_SIM]: {
    apiKey: process.env.NEXT_PUBLIC_FIVE_SIM_API_KEY || '',
    baseUrl: 'https://5sim.net/v1'
  },
  [SmsApiProvider.GRIZZLY]: {
    apiKey: '87027c8840e490f0e1f48157445fd765',
    baseUrl: 'https://api.grizzlysms.com/stubs/handler_api.php'
  }
};

export const DEFAULT_PROVIDER = SmsApiProvider.GRIZZLY; 