'use server';

import { SMS_ACTIVATE_STATUS_CODES } from '@/config/apiConfig';
import { Country, PhoneNumber, Service, ServiceStatus, SmsApiClient, SmsApiProvider } from '@/types/smsApi';

// SMS-Activate API istemcisi
export class SmsActivateClient implements SmsApiClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || 'https://api.sms-activate.org/stubs/handler_api.php';
  }

  /**
   * API'ye HTTP isteği gönderir
   */
  private async makeRequest(action: string, params: Record<string, string> = {}): Promise<string> {
    try {
      const queryParams = new URLSearchParams({
        api_key: this.apiKey,
        action,
        ...params
      });

      const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API yanıt hatası: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.text();
      
      // API hata kontrol
      if (data.startsWith('ACCESS_BALANCE') || data.startsWith('ACCESS_NUMBER') || 
          data.startsWith('STATUS_OK') || data.startsWith('ACCESS_READY') || 
          data.startsWith('STATUS_WAIT_CODE') || data === SMS_ACTIVATE_STATUS_CODES.SUCCESS) {
        return data;
      }
      
      if (data.startsWith('ERROR')) {
        throw new Error(`API hatası: ${data}`);
      }
      
      return data;
    } catch (error) {
      console.error('SMS-Activate API hatası:', error);
      throw error;
    }
  }

  /**
   * Hesap bakiyesini döndürür
   */
  async getBalance(): Promise<number> {
    const response = await this.makeRequest('getBalance');
    
    // ACCESS_BALANCE:123.45 formatı
    const match = response.match(/ACCESS_BALANCE:([\d.]+)/);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }
    
    throw new Error('Bakiye bilgisi alınamadı');
  }

  /**
   * Desteklenen ülkeleri getirir
   */
  async getCountries(): Promise<Country[]> {
    try {
      // API ülke listesi isteği
      const response = await fetch(`https://api.sms-activate.org/stubs/handler_api.php?api_key=${this.apiKey}&action=getCountries`);
      
      if (!response.ok) {
        throw new Error(`Ülke listesi alınamadı: ${response.status}`);
      }
      
      const data = await response.json();
      const countries: Country[] = [];
      
      // API yanıtını uygun formata dönüştür
      for (const [id, countryInfo] of Object.entries(data)) {
        const info = countryInfo as any;
        countries.push({
          id: id,
          name: info.rus || info.eng || '',
          code: info.iso.toLowerCase(),
          flagUrl: `/images/flags/${info.iso.toLowerCase()}.svg`,
          available: true
        });
      }
      
      return countries;
    } catch (error) {
      console.error('Ülke listesi alınamadı:', error);
      return []; // Başarısız olursa boş dizi döndür
    }
  }

  /**
   * Desteklenen servisleri getirir
   */
  async getServices(): Promise<Service[]> {
    try {
      // API servis listesi isteği
      const response = await fetch(`https://api.sms-activate.org/stubs/handler_api.php?api_key=${this.apiKey}&action=getServices`);
      
      if (!response.ok) {
        throw new Error(`Servis listesi alınamadı: ${response.status}`);
      }
      
      const data = await response.json();
      const services: Service[] = [];
      
      // API yanıtını uygun formata dönüştür
      for (const [shortCode, serviceInfo] of Object.entries(data)) {
        const info = serviceInfo as any;
        services.push({
          id: shortCode,
          name: info.name || shortCode,
          shortCode: shortCode,
          iconUrl: `/images/services/${shortCode.toLowerCase()}.svg`,
          price: 0, // Fiyatlar dinamik olarak alınacak
          available: true
        });
      }
      
      return services;
    } catch (error) {
      console.error('Servis listesi alınamadı:', error);
      return []; // Başarısız olursa boş dizi döndür
    }
  }

  /**
   * Belirli bir ülke ve servis için numara alır
   */
  async getNumber(countryCode: string, serviceCode: string): Promise<PhoneNumber | null> {
    try {
      const response = await this.makeRequest('getNumber', {
        service: serviceCode,
        country: countryCode
      });
      
      // ACCESS_NUMBER:12345:79251234567 formatı
      const match = response.match(/ACCESS_NUMBER:(\d+):(\d+)/);
      if (match && match[1] && match[2]) {
        const id = match[1];
        const number = match[2];
        
        // Geçici ülke ve servis nesneleri oluştur
        // Gerçek uygulamada bunlar önceden veri tabanından alınacak
        const country: Country = {
          id: countryCode,
          name: `Country ${countryCode}`, // Geçici isim
          code: countryCode,
          flagUrl: `/images/flags/${countryCode.toLowerCase()}.svg`,
          available: true
        };
        
        const service: Service = {
          id: serviceCode,
          name: `Service ${serviceCode}`, // Geçici isim
          shortCode: serviceCode,
          iconUrl: `/images/services/${serviceCode.toLowerCase()}.svg`,
          price: 0,
          available: true
        };
        
        // Şu anki zaman + 20 dakika sonra sona erecek
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 20 * 60 * 1000);
        
        return {
          id,
          number,
          country,
          service,
          createdAt: now,
          expiresAt,
          status: ServiceStatus.WAITING,
          provider: SmsApiProvider.SMS_ACTIVATE
        };
      }
      
      return null;
    } catch (error) {
      console.error('Numara alınamadı:', error);
      return null;
    }
  }

  /**
   * Numara için SMS kodunu kontrol eder
   */
  async checkSmsCode(numberId: string): Promise<string | null> {
    try {
      const response = await this.makeRequest('getStatus', {
        id: numberId
      });
      
      // STATUS_OK:123456 formatı (onay kodu alındı)
      if (response.startsWith('STATUS_OK:')) {
        return response.split(':')[1];
      }
      
      // Diğer durum değerleri: henüz kod gelmedi veya iptal edildi
      return null;
    } catch (error) {
      console.error('SMS kodu kontrol edilemedi:', error);
      return null;
    }
  }

  /**
   * Numara siparişini iptal eder
   */
  async cancelNumber(numberId: string): Promise<boolean> {
    try {
      const response = await this.makeRequest('setStatus', {
        id: numberId,
        status: '8' // İptal etme durum kodu
      });
      
      return response === SMS_ACTIVATE_STATUS_CODES.SUCCESS;
    } catch (error) {
      console.error('Numara iptal edilemedi:', error);
      return false;
    }
  }
} 