import { ApiConfig, Country, Service, PhoneNumber, ServiceStatus, SmsApiProvider } from '@/types/smsApi';
import { BaseSmsApiClient } from './smsApiClient';
import { FiveSimApiClient } from './fiveSimApiClient';
import { prisma } from '@/lib/prisma';

// Default API configurations
const defaultApiConfigs: ApiConfig[] = [
  {
    provider: SmsApiProvider.SMS_ACTIVATE,
    apiKey: process.env.NEXT_PUBLIC_SMS_ACTIVATE_API_KEY || '',
    active: true
  },
  {
    provider: SmsApiProvider.FIVE_SIM,
    apiKey: process.env.NEXT_PUBLIC_FIVE_SIM_API_KEY || '',
    active: true
  }
];

/**
 * SMS servisi
 */
class SmsService {
  private smsActivateClient: BaseSmsApiClient;
  private fiveSimClient: FiveSimApiClient;
  private config: ApiConfig;
  private apiConfigs: ApiConfig[];
  private clients: Map<SmsApiProvider, BaseSmsApiClient>;
  private static instance: SmsService | null = null;

  private constructor(config: ApiConfig) {
    this.config = config;
    this.smsActivateClient = new BaseSmsApiClient(config);
    this.fiveSimClient = new FiveSimApiClient(config);
    this.apiConfigs = [config];
    this.clients = new Map();
    this.initClients();
  }

  /**
   * Singleton instance'ı döndürür
   */
  public static getInstance(config?: ApiConfig): SmsService {
    if (!SmsService.instance || config) {
      SmsService.instance = new SmsService(config || defaultApiConfigs[0]);
    }
    return SmsService.instance;
  }

  /**
   * Singleton instance'ı sıfırlar
   */
  public static reset(): void {
    if (SmsService.instance) {
      SmsService.instance.destroy();
      SmsService.instance = null;
    }
  }

  /**
   * Kaynakları temizler
   */
  private destroy(): void {
    this.clients.clear();
  }

  /**
   * API istemcilerini başlatır
   */
  private initClients(): void {
    this.clients.clear();
    this.apiConfigs.forEach(config => {
      if (config.provider === SmsApiProvider.SMS_ACTIVATE) {
        this.clients.set(config.provider, this.smsActivateClient);
      } else if (config.provider === SmsApiProvider.FIVE_SIM) {
        this.clients.set(config.provider, this.fiveSimClient);
      }
    });
  }

  /**
   * API yapılandırmasını günceller
   */
  public updateConfig(config: ApiConfig): void {
    this.config = config;
    this.smsActivateClient = new BaseSmsApiClient(config);
    this.fiveSimClient = new FiveSimApiClient(config);
    this.apiConfigs = [config];
    this.initClients();
  }

  /**
   * Tüm API konfigürasyonlarını döndürür
   */
  public getApiConfigs(): ApiConfig[] {
    return [...this.apiConfigs];
  }

  /**
   * Belirli bir API konfigürasyonunu döndürür
   */
  public getApiConfig(provider: SmsApiProvider): ApiConfig | null {
    return this.apiConfigs.find(config => config.provider === provider) || null;
  }

  /**
   * Belirli bir API konfigürasyonunu kaldırır
   */
  public removeApiConfig(provider: SmsApiProvider): void {
    this.apiConfigs = this.apiConfigs.filter(config => config.provider !== provider);
    this.clients.delete(provider);
  }

  /**
   * Tüm API konfigürasyonlarını kaldırır
   */
  public clearApiConfigs(): void {
    this.apiConfigs = [];
    this.clients.clear();
  }

  /**
   * Tüm API istemcilerini döndürür
   */
  public getClients(): Map<SmsApiProvider, BaseSmsApiClient> {
    return new Map(this.clients);
  }

  /**
   * Belirli bir API istemcisini döndürür
   */
  public getClient(provider: SmsApiProvider): BaseSmsApiClient | null {
    return this.clients.get(provider) || null;
  }

  /**
   * Ülkeleri listeler
   */
  public async getCountries(provider: SmsApiProvider = SmsApiProvider.FIVE_SIM, options: Record<string, any> = {}): Promise<Country[]> {
    try {
      // Önce veritabanından kontrol et
      const dbCountries = await prisma.country.findMany();
      
      if (dbCountries.length > 0) {
        return dbCountries.map(country => ({
          id: country.id,
          code: country.code,
          name: country.name,
          flag: country.flag,
          available: country.available
        }));
      }
      
      // Veritabanında yoksa API'den al
      const apiCountries = await this.fiveSimClient.getCountries();
      
      // API'den gelen verileri veritabanına kaydet
      for (const country of apiCountries) {
        await prisma.country.create({
          data: {
            code: country.code,
            name: country.name,
            flag: country.flag,
            available: country.available
          }
        });
      }
      
      return apiCountries;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      return [];
    }
  }

  /**
   * Servisleri listeler
   */
  public async getServices(provider: SmsApiProvider = SmsApiProvider.FIVE_SIM, options: Record<string, any> = {}): Promise<Service[]> {
    try {
      // Önce veritabanından kontrol et
      const dbServices = await prisma.service.findMany();
      
      if (dbServices.length > 0) {
        return dbServices.map(service => ({
          id: service.id.toString(),
          name: service.name,
          icon: service.icon,
          price: service.price,
          available: service.available,
          countryPrices: JSON.parse(service.countryPrices || '{}')
        }));
      }
      
      // Veritabanında yoksa API'den al
      const apiServices = await this.fiveSimClient.getServices();
      
      // API'den gelen verileri veritabanına kaydet
      for (const service of apiServices) {
        await prisma.service.create({
          data: {
            name: service.name,
            icon: service.icon,
            price: service.price,
            available: service.available,
            countryPrices: JSON.stringify(service.countryPrices)
          }
        });
      }
      
      return apiServices;
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
      const phoneNumber = await this.fiveSimClient.requestNumber(serviceId, countryId);
      
      if (phoneNumber) {
        // Veritabanına kaydet
        await prisma.phoneNumber.create({
          data: {
            id: phoneNumber.id,
            number: phoneNumber.number,
            serviceId: phoneNumber.serviceId,
            countryId: phoneNumber.countryId,
            provider: phoneNumber.provider,
            status: phoneNumber.status,
            createdAt: phoneNumber.createdAt || new Date(),
            expiresAt: phoneNumber.expiresAt || new Date(Date.now() + 900000)
          }
        });
      }
      
      return phoneNumber;
    } catch (error) {
      console.error('Failed to request number:', error);
      return null;
    }
  }

  /**
   * Numara durumunu kontrol eder
   */
  public async checkStatus(id: string, provider: SmsApiProvider): Promise<ServiceStatus> {
    try {
      const status = await this.fiveSimClient.checkStatus(id);
      
      // Veritabanını güncelle
      await prisma.phoneNumber.update({
        where: { id },
        data: { status }
      });
      
      return status;
    } catch (error) {
      console.error('Failed to check status:', error);
      return ServiceStatus.ERROR;
    }
  }

  /**
   * SMS kodunu alır
   */
  public async checkSmsCode(id: string, provider: SmsApiProvider): Promise<string | null> {
    try {
      const smsCode = await this.fiveSimClient.checkSmsCode(id);
      
      if (smsCode) {
        // Veritabanını güncelle
        await prisma.phoneNumber.update({
          where: { id },
          data: { smsCode }
        });
      }
      
      return smsCode;
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
      const success = await this.fiveSimClient.cancelNumber(id);
      
      if (success) {
        // Veritabanından sil
        await prisma.phoneNumber.delete({
          where: { id }
        });
      }
      
      return success;
    } catch (error) {
      console.error('Failed to cancel number:', error);
      return false;
    }
  }

  /**
   * Aktif numaraları döndürür
   */
  public async getActiveNumbers(provider: SmsApiProvider = SmsApiProvider.FIVE_SIM, options: Record<string, any> = {}): Promise<PhoneNumber[]> {
    try {
      const activeNumbers = await prisma.phoneNumber.findMany({
        where: {
          provider: provider,
          status: {
            not: ServiceStatus.CANCEL
          }
        }
      });
      
      return activeNumbers.map(number => ({
        id: number.id,
        number: number.number,
        serviceId: number.serviceId,
        countryId: number.countryId,
        provider: number.provider as SmsApiProvider,
        status: number.status as ServiceStatus,
        smsCode: number.smsCode || undefined,
        createdAt: number.createdAt,
        expiresAt: number.expiresAt
      }));
    } catch (error) {
      console.error('Failed to get active numbers:', error);
      return [];
    }
  }
}

/**
 * SMS servisi instance'ı döndürür
 */
export function getSmsService(config?: ApiConfig): SmsService {
  return SmsService.getInstance(config);
}

export { SmsService }; 