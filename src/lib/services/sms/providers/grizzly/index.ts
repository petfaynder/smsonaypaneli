import { Country, PhoneNumber, Service, SmsApiConfig, SmsApiResponse } from '../../types';
import { GRIZZLY_ERRORS, GRIZZLY_STATUS } from './constants';
import { GrizzlyPriceResponse, GrizzlyStatusResponse } from './types';

export class GrizzlySmsProvider {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: SmsApiConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl;
  }

  private async request<T>(action: string, params: Record<string, string | number> = {}): Promise<SmsApiResponse<T>> {
    try {
      const searchParams = new URLSearchParams({
        api_key: this.apiKey,
        action,
        ...params
      });

      const response = await fetch(`${this.baseUrl}?${searchParams}`);
      const text = await response.text();

      // Handle different response formats
      try {
        const json = JSON.parse(text);
        if (json.status === 'error') {
          return { success: false, error: json.error };
        }
        return { success: true, data: json };
      } catch {
        // Handle non-JSON responses
        if (text.startsWith('ACCESS_')) {
          return { success: true, data: text as any };
        }
        if (text.includes('STATUS_')) {
          return { success: true, data: { status: text } as any };
        }
        if (GRIZZLY_ERRORS[text as keyof typeof GRIZZLY_ERRORS]) {
          return { success: false, error: text };
        }
        return { success: true, data: text as any };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getCountries(): Promise<SmsApiResponse<Country[]>> {
    const response = await this.request<GrizzlyPriceResponse>('getPrices');
    
    if (!response.success || !response.data) {
      return response;
    }

    const countries = Object.keys(response.data).map(code => ({
      id: code,
      code,
      name: code // You might want to add a country code to name mapping
    }));

    return { success: true, data: countries };
  }

  async getServices(): Promise<SmsApiResponse<Service[]>> {
    const response = await this.request<GrizzlyPriceResponse>('getPrices');
    
    if (!response.success || !response.data) {
      return response;
    }

    const firstCountry = Object.values(response.data)[0];
    if (!firstCountry) {
      return { success: true, data: [] };
    }

    const services = Object.entries(firstCountry).map(([name, data]) => ({
      id: name,
      name,
      price: data.cost,
      countryPrices: {}
    }));

    return { success: true, data: services };
  }

  async requestNumber(service: string, country: string): Promise<SmsApiResponse<PhoneNumber>> {
    const response = await this.request<string>('getNumber', {
      service,
      country
    });

    if (!response.success || !response.data) {
      return response;
    }

    const [status, id, number] = response.data.split(':');
    if (status !== 'ACCESS_NUMBER') {
      return { success: false, error: 'Invalid response format' };
    }

    return {
      success: true,
      data: {
        id,
        number,
        status: 'PENDING',
        serviceId: service,
        countryId: country,
        createdAt: new Date()
      }
    };
  }

  async checkStatus(id: string): Promise<SmsApiResponse<GrizzlyStatusResponse>> {
    const response = await this.request<string>('getStatus', { id });

    if (!response.success || !response.data) {
      return response;
    }

    const [status, code] = response.data.split(':');
    return {
      success: true,
      data: { status, code }
    };
  }

  async cancelNumber(id: string): Promise<SmsApiResponse<boolean>> {
    const response = await this.request<string>('setStatus', {
      id,
      status: 8
    });

    return {
      success: response.success && response.data === 'ACCESS_CANCEL',
      error: response.error
    };
  }
} 