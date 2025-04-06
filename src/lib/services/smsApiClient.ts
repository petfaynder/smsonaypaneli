import { ApiConfig, Country, Service, PhoneNumber, ServiceStatus, SmsApiProvider } from '@/types/smsApi';

/**
 * SMS API istemcisi
 */
export class BaseSmsApiClient {
  protected config: ApiConfig;
  protected baseUrl: string;

  constructor(config: ApiConfig) {
    this.config = config;
    this.baseUrl = '/api/sms';
  }

  /**
   * API isteği gönderir
   */
  protected async request<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    // API isteği için URL oluştur
    const url = new URL(this.baseUrl, window.location.origin);
    
    // Tüm parametreleri ekle
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }

    console.log('API Request Details:', {
      url: url.toString(),
      params: params,
      apiKeyPresent: !!this.config.apiKey,
      endpoint: endpoint
    });
    
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error('API Response Error:', {
          status: response.status,
          statusText: response.statusText,
          url: url.toString(),
          endpoint: endpoint
        });
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const text = await response.text();
      console.log('API Raw Response:', {
        url: url.toString(),
        status: response.status,
        responseText: text,
        contentType: response.headers.get('content-type'),
        endpoint: endpoint
      });
      
      // API yanıtını kontrol et
      if (text.includes('ACCESS_') || text.includes('Unauthorized')) {
        console.error('API Authorization Error:', {
          error: text,
          url: url.toString(),
          endpoint: endpoint
        });
        throw new Error(`API authorization error: ${text}`);
      }
      
      // JSON yanıtı parse et
      try {
        // BAD_ACTION kontrolü
        if (text === 'BAD_ACTION') {
          console.error('API Bad Action Error:', {
            action: params.action,
            url: url.toString(),
            endpoint: endpoint
          });
          throw new Error(`Invalid API action: ${params.action}`);
        }

        const jsonResponse = JSON.parse(text);
        console.log('API Parsed Response:', {
          url: url.toString(),
          data: jsonResponse,
          dataType: typeof jsonResponse,
          isArray: Array.isArray(jsonResponse),
          keys: Object.keys(jsonResponse),
          endpoint: endpoint
        });
        
        if (jsonResponse.error) {
          console.error('API Error Response:', {
            error: jsonResponse.error,
            url: url.toString(),
            endpoint: endpoint
          });
          throw new Error(`API error: ${jsonResponse.error}`);
        }
        
        return jsonResponse;
      } catch (error) {
        if (error instanceof Error && error.message.startsWith('API error:')) {
          throw error;
        }
        console.error('API Response Parse Error:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          responseText: text,
          url: url.toString(),
          endpoint: endpoint
        });
        // JSON parse edilemezse text olarak döndür
        return text as unknown as T;
      }
    } catch (error) {
      console.error('API Request Error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: url.toString(),
        endpoint: endpoint
      });
      throw error;
    }
  }

  /**
   * Bakiye sorgular
   */
  public async getBalance(): Promise<number> {
    const response = await this.request<{ balance: string }>('/getBalance', {
      api_key: this.config.apiKey
    });
    return parseFloat(response.balance);
  }

  /**
   * Ülkeleri listeler
   */
  public async getCountries(): Promise<Country[]> {
    try {
      const response = await this.request<any>('', {
        action: 'getCountries'
      });
      
      // Yanıtı parse et
      const countries: Country[] = [];
      
      // API yanıtı bir obje ise
      if (typeof response === 'object' && response !== null) {
        // API yanıtını işle
        console.log('Countries response object:', response);
        
        // Objenin değerlerini döngüye al
        Object.entries(response).forEach(([id, country]: [string, any]) => {
          if (country && country.eng && country.visible === 1) {
            // Ülke kodunu oluştur
            let countryCode = '';
            
            // Özel durumlar için kod eşleştirmeleri
            const codeMap: Record<string, string> = {
              'United Kingdom': 'GB',
              'Hong Kong': 'HK',
              'Macao': 'MO',
              'DCongo': 'CD',
              'Ivory': 'CI',
              'Southafrica': 'ZA'
            };
            
            // Eğer özel bir eşleştirme varsa onu kullan
            if (codeMap[country.eng]) {
              countryCode = codeMap[country.eng];
            } else {
              // Yoksa ilk iki harfi al
              countryCode = country.eng.substring(0, 2).toUpperCase();
            }
            
            countries.push({
              id: parseInt(id),
              name: country.eng,
              code: countryCode,
              flag: `/images/flags/${countryCode.toLowerCase()}.svg`,
              available: true
            });
          }
        });
      }
      
      console.log('Fetched countries:', countries);
      return countries;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      return [];
    }
  }

  /**
   * Servisleri listeler
   */
  public async getServices(): Promise<Service[]> {
    try {
      const response = await this.request<any>('', {
        action: 'getServices'
      });
      
      // Yanıtı parse et
      const services: Service[] = [];
      
      // API yanıtı bir obje ise
      if (typeof response === 'object' && response !== null) {
        // API yanıtını işle
        console.log('Services response object:', response);
        
        // Objenin değerlerini döngüye al
        Object.entries(response).forEach(([id, service]: [string, any]) => {
          if (service && service.name) {
            services.push({
              id: id,
              name: service.name,
              icon: `/images/services/${id.toLowerCase()}.svg`,
              price: parseFloat(service.price || '0'),
              available: true,
              countryPrices: {}
            });
          }
        });
      }
      
      console.log('Fetched services:', services);
      return services;
    } catch (error) {
      console.error('Failed to fetch services:', error);
      return [];
    }
  }

  /**
   * Numara alır
   */
  public async requestNumber(serviceId: string, countryId: number): Promise<PhoneNumber | null> {
    try {
      const response = await this.request<PhoneNumber>('/getNumber', {
        api_key: this.config.apiKey,
        service: serviceId,
        country: countryId.toString()
      });
      return response;
    } catch (error) {
      console.error('Failed to request number:', error);
      return null;
    }
  }

  /**
   * Numara durumunu kontrol eder
   */
  public async checkStatus(id: string): Promise<ServiceStatus> {
    const response = await this.request<{ status: ServiceStatus }>('/getStatus', {
      api_key: this.config.apiKey,
      id
    });
    return response.status;
  }

  /**
   * SMS kodunu alır
   */
  public async checkSmsCode(id: string): Promise<string | null> {
    try {
      const response = await this.request<{ code: string }>('/getCode', {
        api_key: this.config.apiKey,
        id
      });
      return response.code;
    } catch (error) {
      console.error('Failed to get SMS code:', error);
      return null;
    }
  }

  /**
   * Numarayı iptal eder
   */
  public async cancelNumber(id: string): Promise<boolean> {
    try {
      await this.request('/setStatus', {
        api_key: this.config.apiKey,
        id,
        status: '8'
      });
      return true;
    } catch (error) {
      console.error('Failed to cancel number:', error);
      return false;
    }
  }
}

/**
 * SMS-Activate API istemcisi
 */
export class SmsActivateClient extends BaseSmsApiClient {
  constructor(config: ApiConfig) {
    super(config);
  }

  /**
   * Numara alır
   */
  public async requestNumber(serviceId: string, countryId: number): Promise<PhoneNumber | null> {
    try {
      const response = await this.request<PhoneNumber>('/getNumber', {
        api_key: this.config.apiKey,
        service: serviceId,
        country: countryId.toString()
      });
      return response;
    } catch (error) {
      console.error('Failed to request number:', error);
      return null;
    }
  }

  /**
   * Numara durumunu kontrol eder
   */
  public async checkStatus(id: string): Promise<ServiceStatus> {
    const response = await this.request<{ status: ServiceStatus }>('/getStatus', {
      api_key: this.config.apiKey,
      id
    });
    return response.status;
  }

  /**
   * SMS kodunu alır
   */
  public async checkSmsCode(id: string): Promise<string | null> {
    try {
      const response = await this.request<{ code: string }>('/getCode', {
        api_key: this.config.apiKey,
        id
      });
      return response.code;
    } catch (error) {
      console.error('Failed to get SMS code:', error);
      return null;
    }
  }

  /**
   * Numarayı iptal eder
   */
  public async cancelNumber(id: string): Promise<boolean> {
    try {
      await this.request('/setStatus', {
        api_key: this.config.apiKey,
        id,
        status: '8'
      });
      return true;
    } catch (error) {
      console.error('Failed to cancel number:', error);
      return false;
    }
  }
} 