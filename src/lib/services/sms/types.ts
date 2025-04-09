export enum SmsApiProvider {
  SMS_ACTIVATE = 'SMS_ACTIVATE',
  FIVE_SIM = 'FIVE_SIM',
  GRIZZLY = 'GRIZZLY'
}

export interface Country {
  id: number | string;
  name: string;
  code: string;
}

export interface Service {
  id: number | string;
  name: string;
  price: number;
  countryPrices?: Record<string, number>;
}

export interface PhoneNumber {
  id: string;
  number: string;
  status: string;
  serviceId: string | number;
  countryId: string | number;
  smsCode?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface SmsApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SmsApiConfig {
  apiKey: string;
  baseUrl: string;
} 