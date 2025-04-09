import { DEFAULT_PROVIDER, SMS_API_CONFIGS } from './constants';
import { Country, PhoneNumber, Service, SmsApiProvider, SmsApiResponse } from './types';
import { GrizzlySmsProvider } from './providers/grizzly';
import { FiveSimProvider } from './providers/fivesim';
import { SmsActivateProvider } from './providers/smsactivate';

export class SmsService {
  private providers: Map<SmsApiProvider, any>;
  private currentProvider: SmsApiProvider;

  constructor(provider: SmsApiProvider = DEFAULT_PROVIDER) {
    this.providers = new Map();
    this.currentProvider = provider;

    // Initialize providers
    this.providers.set(SmsApiProvider.GRIZZLY, new GrizzlySmsProvider(SMS_API_CONFIGS[SmsApiProvider.GRIZZLY]));
    this.providers.set(SmsApiProvider.FIVE_SIM, new FiveSimProvider(SMS_API_CONFIGS[SmsApiProvider.FIVE_SIM]));
    this.providers.set(SmsApiProvider.SMS_ACTIVATE, new SmsActivateProvider(SMS_API_CONFIGS[SmsApiProvider.SMS_ACTIVATE]));
  }

  setProvider(provider: SmsApiProvider) {
    if (!this.providers.has(provider)) {
      throw new Error(`Provider ${provider} not found`);
    }
    this.currentProvider = provider;
  }

  private getProvider() {
    const provider = this.providers.get(this.currentProvider);
    if (!provider) {
      throw new Error(`Provider ${this.currentProvider} not initialized`);
    }
    return provider;
  }

  async getCountries(): Promise<SmsApiResponse<Country[]>> {
    return this.getProvider().getCountries();
  }

  async getServices(): Promise<SmsApiResponse<Service[]>> {
    return this.getProvider().getServices();
  }

  async requestNumber(service: string, country: string): Promise<SmsApiResponse<PhoneNumber>> {
    return this.getProvider().requestNumber(service, country);
  }

  async checkStatus(id: string): Promise<SmsApiResponse<any>> {
    return this.getProvider().checkStatus(id);
  }

  async cancelNumber(id: string): Promise<SmsApiResponse<boolean>> {
    return this.getProvider().cancelNumber(id);
  }
} 