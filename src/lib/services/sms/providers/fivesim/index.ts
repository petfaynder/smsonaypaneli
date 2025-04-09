import { Country, PhoneNumber, Service, SmsApiConfig, SmsApiResponse } from '../../types';

export class FiveSimProvider {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: SmsApiConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<SmsApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        return { success: false, error };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getCountries(): Promise<SmsApiResponse<Country[]>> {
    const response = await this.request<any[]>('/countries');
    
    if (!response.success || !response.data) {
      return response;
    }

    const countries = response.data.map(country => ({
      id: country.id,
      name: country.name,
      code: country.iso
    }));

    return { success: true, data: countries };
  }

  async getServices(): Promise<SmsApiResponse<Service[]>> {
    const response = await this.request<any[]>('/products');
    
    if (!response.success || !response.data) {
      return response;
    }

    const services = response.data.map(service => ({
      id: service.id,
      name: service.name,
      price: service.price,
      countryPrices: {}
    }));

    return { success: true, data: services };
  }

  async requestNumber(service: string, country: string): Promise<SmsApiResponse<PhoneNumber>> {
    const response = await this.request<any>('/purchase', {
      method: 'POST',
      body: JSON.stringify({
        product: service,
        country,
      })
    });

    if (!response.success || !response.data) {
      return response;
    }

    return {
      success: true,
      data: {
        id: response.data.id,
        number: response.data.phone,
        status: response.data.status,
        serviceId: service,
        countryId: country,
        createdAt: new Date(response.data.created_at),
        expiresAt: new Date(response.data.expires)
      }
    };
  }

  async checkStatus(id: string): Promise<SmsApiResponse<any>> {
    return this.request<any>(`/check/${id}`);
  }

  async cancelNumber(id: string): Promise<SmsApiResponse<boolean>> {
    const response = await this.request<any>(`/cancel/${id}`, {
      method: 'POST'
    });

    return {
      success: response.success,
      error: response.error
    };
  }
} 