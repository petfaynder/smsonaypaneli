/**
 * SMS API sağlayıcıları
 */
export enum SmsApiProvider {
  SMS_ACTIVATE = 'SMS_ACTIVATE',
  FIVE_SIM = 'FIVE_SIM'
}

/**
 * Servis durumları
 */
export enum ServiceStatus {
  WAITING = 'waiting',
  SUCCESS = 'success',
  TIMEOUT = 'timeout',
  CANCEL = 'cancel',
  ERROR = 'error',
  RECEIVED = 'received'
}

/**
 * API konfigürasyonu
 */
export interface ApiConfig {
  provider: SmsApiProvider;
  apiKey: string;
  baseUrl?: string;
  active: boolean;
}

/**
 * Ülke bilgisi
 */
export interface Country {
  id: number;
  name: string;
  code: string;
  flag: string;
  available?: boolean;
}

/**
 * Servis bilgisi
 */
export interface Service {
  id: string;
  name: string;
  icon: string;
  price: number;
  shortCode?: string;
  available?: boolean;
  countryPrices: Record<string, number>;
}

/**
 * Telefon numarası
 */
export interface PhoneNumber {
  id: string;
  number: string;
  serviceId: string;
  countryId: number;
  provider: SmsApiProvider;
  status: ServiceStatus;
  smsCode?: string;
  createdAt?: Date;
  expiresAt?: Date;
}

// Sipariş bilgisi
export interface Order {
  id: string;
  service: string;
  number: string;
  country: string;
  status: ServiceStatus;
  createdAt: Date;
  expiresAt: Date;
  smsCode?: string;
}

// SMS API istemci arayüzü
export interface SmsApiClient {
  getBalance(): Promise<number>;
  getCountries(): Promise<Country[]>;
  getServices(): Promise<Service[]>;
  requestNumber(serviceId: string, countryId: number): Promise<PhoneNumber | null>;
  checkSmsCode(activationId: string): Promise<string | null>;
  cancelNumber(activationId: string): Promise<boolean>;
}

// İstek gereksinimleri
export interface NumberRequest {
  serviceId: string;
  countryId: number;
}

// SMS durum yanıtı
export interface SmsStatusResponse {
  status: ServiceStatus;
  smsCode?: string;
  message?: string;
}

// 5sim.net API response types
export interface FiveSimProfile {
  id: number;
  email: string;
  balance: number;
  created_at: string;
}

export interface FiveSimCountry {
  name: string;
  code: string;
}

export interface FiveSimService {
  id: string;
  name: string;
  price: number;
}

export interface FiveSimActivation {
  id: string;
  phone: string;
  operator: string;
  product: string;
  price: number;
  status: string;
  sms: FiveSimSms[];
  created_at: string;
  expires_at: string;
}

export interface FiveSimSms {
  id: string;
  created_at: string;
  code: string;
} 