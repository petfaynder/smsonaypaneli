import { ApiConfig, Country, Service, PhoneNumber, ServiceStatus, SmsApiProvider, FiveSimProfile, FiveSimCountry, FiveSimService, FiveSimActivation, FiveSimSms } from '@/types/smsApi';
import { BaseSmsApiClient } from './smsApiClient';

/**
 * 5sim.net API istemcisi
 */
export class FiveSimApiClient extends BaseSmsApiClient {
  protected baseUrl: string;

  constructor(config: ApiConfig) {
    super(config);
    this.baseUrl = 'https://5sim.net/v1';
  }

  /**
   * API isteği gönderir
   */
  protected async request<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    // API isteği için URL oluştur
    const apiUrl = `${this.baseUrl}${endpoint}`;
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(apiUrl)}`;
    
    console.log('5sim API Request Details:', {
      apiUrl,
      proxyUrl,
      endpoint,
      apiKeyPresent: !!this.config.apiKey
    });
    
    try {
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        console.error('5sim API Response Error:', {
          status: response.status,
          statusText: response.statusText,
          url: apiUrl,
          endpoint
        });
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const text = await response.text();
      console.log('5sim API Raw Response:', {
        url: apiUrl,
        status: response.status,
        responseText: text,
        contentType: response.headers.get('content-type'),
        endpoint
      });
      
      // JSON yanıtı parse et
      try {
        const jsonResponse = JSON.parse(text);
        console.log('5sim API Parsed Response:', {
          url: apiUrl,
          data: jsonResponse,
          dataType: typeof jsonResponse,
          isArray: Array.isArray(jsonResponse),
          keys: Object.keys(jsonResponse),
          endpoint
        });
        
        return jsonResponse;
      } catch (error) {
        console.error('5sim API Response Parse Error:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          responseText: text,
          url: apiUrl,
          endpoint
        });
        throw error;
      }
    } catch (error) {
      console.error('5sim API Request Error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: apiUrl,
        endpoint
      });
      throw error;
    }
  }

  /**
   * POST isteği gönderir
   */
  protected async post<T>(endpoint: string, body?: any): Promise<T> {
    // API isteği için URL oluştur
    const apiUrl = `${this.baseUrl}${endpoint}`;
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(apiUrl)}`;
    
    console.log('5sim API POST Request Details:', {
      apiUrl,
      proxyUrl,
      endpoint,
      apiKeyPresent: !!this.config.apiKey
    });
    
    try {
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      
      if (!response.ok) {
        console.error('5sim API Response Error:', {
          status: response.status,
          statusText: response.statusText,
          url: apiUrl,
          endpoint
        });
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const text = await response.text();
      console.log('5sim API Raw Response:', {
        url: apiUrl,
        status: response.status,
        responseText: text,
        contentType: response.headers.get('content-type'),
        endpoint
      });
      
      // JSON yanıtı parse et
      try {
        const jsonResponse = JSON.parse(text);
        console.log('5sim API Parsed Response:', {
          url: apiUrl,
          data: jsonResponse,
          dataType: typeof jsonResponse,
          isArray: Array.isArray(jsonResponse),
          keys: Object.keys(jsonResponse),
          endpoint
        });
        
        return jsonResponse;
      } catch (error) {
        console.error('5sim API Response Parse Error:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          responseText: text,
          url: apiUrl,
          endpoint
        });
        throw error;
      }
    } catch (error) {
      console.error('5sim API Request Error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: apiUrl,
        endpoint
      });
      throw error;
    }
  }

  /**
   * Kullanıcı profilini getirir
   */
  public async getUserProfile(): Promise<FiveSimProfile> {
    return this.request<FiveSimProfile>('/user/profile');
  }

  /**
   * Bakiye sorgular
   */
  public async getBalance(): Promise<number> {
    const response = await this.request<FiveSimProfile>('/user/profile');
    return response.balance;
  }

  /**
   * Ülkeleri listeler
   */
  public async getCountries(): Promise<Country[]> {
    try {
      const response = await this.request<Record<string, FiveSimCountry>>('/guest/countries');
      
      // Yanıtı parse et
      const countries: Country[] = [];
      
      // API yanıtı bir obje ise
      if (typeof response === 'object' && response !== null) {
        // API yanıtını işle
        console.log('5sim Countries response object:', response);
        
        // Objenin değerlerini döngüye al
        Object.entries(response).forEach(([code, country]: [string, FiveSimCountry]) => {
          if (country && country.name) {
            countries.push({
              id: countries.length + 1, // 5sim doesn't provide IDs, so we generate them
              name: country.name,
              code: code.toUpperCase(),
              flag: `/images/flags/${code.toLowerCase()}.svg`,
              available: true
            });
          }
        });
      }
      
      console.log('Fetched 5sim countries:', countries);
      return countries;
    } catch (error) {
      console.error('Failed to fetch 5sim countries:', error);
      return [];
    }
  }

  /**
   * Servisleri listeler
   */
  public async getServices(): Promise<Service[]> {
    try {
      const response = await this.request<Record<string, FiveSimService>>('/guest/products');
      
      // Yanıtı parse et
      const services: Service[] = [];
      
      // API yanıtı bir obje ise
      if (typeof response === 'object' && response !== null) {
        // API yanıtını işle
        console.log('5sim Services response object:', response);
        
        // Objenin değerlerini döngüye al
        Object.entries(response).forEach(([id, service]: [string, FiveSimService]) => {
          if (service && service.name) {
            services.push({
              id: id,
              name: service.name,
              icon: `/images/services/${id.toLowerCase()}.svg`,
              price: service.price,
              available: true,
              countryPrices: {}
            });
          }
        });
      }
      
      console.log('Fetched 5sim services:', services);
      return services;
    } catch (error) {
      console.error('Failed to fetch 5sim services:', error);
      return [];
    }
  }

  /**
   * Numara alır
   */
  public async requestNumber(serviceId: string, countryId: number): Promise<PhoneNumber | null> {
    try {
      // 5sim API'si ülke kodunu bekler, ID değil
      const country = await this.getCountryByCode(countryId);
      if (!country) {
        throw new Error(`Country with ID ${countryId} not found`);
      }
      
      const response = await this.post<FiveSimActivation>('/user/buy/activation/' + country.code + '/' + serviceId);
      
      if (response && response.id) {
        return {
          id: response.id,
          number: response.phone,
          serviceId: serviceId,
          countryId: countryId,
          provider: SmsApiProvider.FIVE_SIM,
          status: ServiceStatus.WAITING,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 900000), // 15 dakika
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to request number:', error);
      return null;
    }
  }

  /**
   * Ülke koduna göre ülke bilgisini getirir
   */
  private async getCountryByCode(countryId: number): Promise<Country | null> {
    const countries = await this.getCountries();
    return countries.find(country => country.id === countryId) || null;
  }

  /**
   * Numara durumunu kontrol eder
   */
  public async checkStatus(id: string): Promise<ServiceStatus> {
    try {
      const response = await this.request<FiveSimActivation>(`/user/check/${id}`);
      
      if (response && response.sms && response.sms.length > 0) {
        return ServiceStatus.SUCCESS;
      }
      
      return ServiceStatus.WAITING;
    } catch (error) {
      console.error('Failed to check 5sim status:', error);
      return ServiceStatus.ERROR;
    }
  }

  /**
   * SMS kodunu alır
   */
  public async checkSmsCode(id: string): Promise<string | null> {
    try {
      const response = await this.request<FiveSimActivation>(`/user/check/${id}`);
      
      if (response && response.sms && response.sms.length > 0) {
        return response.sms[0].code;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get 5sim SMS code:', error);
      return null;
    }
  }

  /**
   * Numarayı iptal eder
   */
  public async cancelNumber(id: string): Promise<boolean> {
    try {
      await this.post(`/user/cancel/${id}`);
      return true;
    } catch (error) {
      console.error('Failed to cancel number:', error);
      return false;
    }
  }
} 