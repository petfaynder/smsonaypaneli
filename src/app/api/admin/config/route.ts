import { NextRequest, NextResponse } from 'next/server';
import { getSmsService } from '@/lib/services/smsService';
import { isSystemOperational } from '@/lib/licenseService';
import { ApiConfig } from '@/types/smsApi';

/**
 * API konfigürasyonlarını alır
 */
export async function GET() {
  try {
    // Lisans kontrolü
    const isOperational = await isSystemOperational();
    if (!isOperational) {
      return NextResponse.json({ error: 'Sistem şu anda kullanılamıyor. Lütfen lisans durumunuzu kontrol edin.' }, { status: 403 });
    }
    
    const smsService = getSmsService();
    const apiConfigs = smsService.getApiConfigs();
    
    return NextResponse.json({ apiConfigs });
  } catch (error) {
    console.error('API konfigürasyonları alınırken hata oluştu:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

/**
 * API konfigürasyonlarını günceller
 */
export async function POST(request: NextRequest) {
  try {
    // Lisans kontrolü
    const isOperational = await isSystemOperational();
    if (!isOperational) {
      return NextResponse.json({ error: 'Sistem şu anda kullanılamıyor. Lütfen lisans durumunuzu kontrol edin.' }, { status: 403 });
    }
    
    const data = await request.json();
    const { apiConfigs } = data as { apiConfigs: ApiConfig[] };
    
    if (!apiConfigs || !Array.isArray(apiConfigs)) {
      return NextResponse.json({ 
        error: 'Geçersiz istek, API konfigürasyonları gereklidir' 
      }, { status: 400 });
    }
    
    const smsService = getSmsService();
    
    // Her bir konfigürasyonu güncelle
    for (const config of apiConfigs) {
      smsService.updateConfig(config);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'API konfigürasyonları başarıyla güncellendi' 
    });
  } catch (error) {
    console.error('API konfigürasyonları güncellenirken hata oluştu:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
} 