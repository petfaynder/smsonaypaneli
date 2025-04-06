import { NextRequest, NextResponse } from 'next/server';
import { getSmsService } from '@/lib/services/smsService';
import { SmsApiProvider } from '@/types/smsApi';

/**
 * SMS API route handler
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const provider = searchParams.get('provider') as SmsApiProvider || SmsApiProvider.FIVE_SIM;

    console.log('SMS API Request:', {
      action,
      provider,
      url: request.url,
      searchParams: Object.fromEntries(searchParams.entries())
    });

    const smsService = getSmsService({
      provider,
      apiKey: process.env.NEXT_PUBLIC_FIVE_SIM_API_KEY || '',
      active: true
    });

    let response;

    switch (action) {
      case 'getCountries':
        response = await smsService.getCountries();
        break;
      case 'getServices':
        response = await smsService.getServices();
        break;
      case 'getBalance':
        response = await smsService.getBalance();
        break;
      case 'checkStatus':
        const id = searchParams.get('id');
        if (!id) {
          throw new Error('ID parameter is required for checkStatus action');
        }
        response = await smsService.checkStatus(id, provider);
        break;
      case 'checkSmsCode':
        const activationId = searchParams.get('id');
        if (!activationId) {
          throw new Error('ID parameter is required for checkSmsCode action');
        }
        response = await smsService.checkSmsCode(activationId, provider);
        break;
      case 'cancelNumber':
        const numberId = searchParams.get('id');
        if (!numberId) {
          throw new Error('ID parameter is required for cancelNumber action');
        }
        response = await smsService.cancelNumber(numberId, provider);
        break;
      default:
        throw new Error(`Invalid action: ${action}`);
    }

    console.log('SMS API Response:', {
      action,
      provider,
      response
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('SMS API Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: request.url,
      searchParams: Object.fromEntries(request.nextUrl.searchParams.entries())
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * SMS API route handler for POST requests
 */
export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const provider = searchParams.get('provider') as SmsApiProvider || SmsApiProvider.FIVE_SIM;

    console.log('SMS API Request:', {
      action,
      provider,
      url: request.url,
      searchParams: Object.fromEntries(searchParams.entries())
    });

    const smsService = getSmsService({
      provider,
      apiKey: process.env.NEXT_PUBLIC_FIVE_SIM_API_KEY || '',
      active: true
    });

    let response;

    switch (action) {
      case 'requestNumber':
        const serviceId = searchParams.get('serviceId');
        const countryId = searchParams.get('countryId');
        if (!serviceId || !countryId) {
          throw new Error('serviceId and countryId parameters are required for requestNumber action');
        }
        response = await smsService.requestNumber(serviceId, parseInt(countryId));
        break;
      default:
        throw new Error(`Invalid action: ${action}`);
    }

    console.log('SMS API Response:', {
      action,
      provider,
      response
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('SMS API Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: request.url,
      searchParams: Object.fromEntries(request.nextUrl.searchParams.entries())
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 