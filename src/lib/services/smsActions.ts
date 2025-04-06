'use server';

import { SmsService } from './smsService';
import { ApiConfig, Country, Service, PhoneNumber, NumberRequest, SmsStatusResponse } from '@/types/smsApi';

// Server actions for SMS operations
export async function getBalances(): Promise<Record<string, number>> {
  const service = SmsService.getInstance();
  return service.getBalances();
}

export async function getCountries(): Promise<Country[]> {
  const service = SmsService.getInstance();
  return service.getCountries();
}

export async function getServices(): Promise<Service[]> {
  const service = SmsService.getInstance();
  return service.getServices();
}

export async function requestNumber(request: NumberRequest): Promise<PhoneNumber | null> {
  const service = SmsService.getInstance();
  return service.requestNumber(request);
}

export async function checkStatus(numberId: string): Promise<SmsStatusResponse> {
  const service = SmsService.getInstance();
  return service.checkStatus(numberId);
}

export async function cancelNumber(numberId: string): Promise<boolean> {
  const service = SmsService.getInstance();
  return service.cancelNumber(numberId);
}

export async function getApiConfigs(): Promise<ApiConfig[]> {
  const service = SmsService.getInstance();
  return service.getApiConfigs();
}

export async function updateApiConfig(config: ApiConfig): Promise<void> {
  const service = SmsService.getInstance();
  service.updateApiConfig(config);
}

export async function getActiveNumbers(): Promise<PhoneNumber[]> {
  const service = SmsService.getInstance();
  return service.getActiveNumbers();
} 