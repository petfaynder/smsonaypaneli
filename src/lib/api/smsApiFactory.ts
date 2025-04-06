'use server';

import { ApiConfig, SmsApiClient } from '@/types/smsApi';
import { SmsActivateClient } from '../services/smsService';

/**
 * API istemcisi oluşturan fabrika sınıfı.
 * Farklı SMS API sağlayıcıları için uygun istemciyi oluşturur.
 */
export class SmsApiFactory {
  /**
   * API konfigürasyonuna göre uygun istemciyi döndürür
   */
  static createClient(config: ApiConfig): SmsApiClient | null {
    switch (config.provider) {
      case 'sms-activate':
        return new SmsActivateClient(config);
      default:
        console.error(`Unsupported SMS provider: ${config.provider}`);
        return null;
    }
  }
} 