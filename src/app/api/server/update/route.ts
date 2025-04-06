import { NextRequest, NextResponse } from 'next/server';
import { isSystemOperational, refreshLicense } from '@/lib/licenseService';

/**
 * Güncelleme kontrolü yapar
 */
export async function GET(request: NextRequest) {
  try {
    // API anahtarını doğrula
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        error: 'Unauthorized - API anahtarı gereklidir' 
      }, { status: 401 });
    }
    
    // API anahtarını çıkar
    const apiKey = authHeader.split(' ')[1];
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Unauthorized - Geçersiz API anahtarı' 
      }, { status: 401 });
    }
    
    // Lisans durumunu kontrol et
    const isOperational = await isSystemOperational();
    
    if (!isOperational) {
      return NextResponse.json({ 
        error: 'Sistem kullanılamıyor - Lisans sorunu' 
      }, { status: 403 });
    }
    
    // Mevcut sürüm bilgisini al
    const currentVersion = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';
    const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost';
    
    // Lisans bilgilerini yenile
    await refreshLicense();
    
    // Güncelleme bilgilerini döndür
    return NextResponse.json({
      success: true,
      version: {
        current: currentVersion,
        latest: '1.0.1', // Sunucudan alınması gerekir
        update_available: currentVersion !== '1.0.1',
      },
      license: {
        domain,
        status: 'active',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün sonra
      },
      updates: [
        {
          version: '1.0.1',
          release_date: '2023-05-15',
          description: 'Bu güncelleme performans iyileştirmeleri ve hata düzeltmeleri içerir.',
          changes: [
            'SMS onay hızı artırıldı',
            'Yeni API entegrasyonları eklendi',
            'Güvenlik güncellemeleri yapıldı',
            'Kullanıcı arayüzü iyileştirildi'
          ]
        }
      ]
    });
  } catch (error) {
    console.error('Güncelleme kontrolü sırasında hata oluştu:', error);
    return NextResponse.json({ 
      error: 'Sunucu hatası' 
    }, { status: 500 });
  }
}

/**
 * Güncelleme işlemini yapar
 */
export async function POST(request: NextRequest) {
  try {
    // API anahtarını doğrula
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        error: 'Unauthorized - API anahtarı gereklidir' 
      }, { status: 401 });
    }
    
    // Lisans durumunu kontrol et
    const isOperational = await isSystemOperational();
    
    if (!isOperational) {
      return NextResponse.json({ 
        error: 'Sistem kullanılamıyor - Lisans sorunu' 
      }, { status: 403 });
    }
    
    // Güncelleme verilerini al
    const data = await request.json();
    const { version } = data;
    
    if (!version) {
      return NextResponse.json({ 
        error: 'Geçersiz istek - Sürüm bilgisi gereklidir' 
      }, { status: 400 });
    }
    
    // Güncelleme işlemi başlat
    // Gerçek uygulamada burada sunucudan güncelleme dosyaları indirilir
    
    return NextResponse.json({
      success: true,
      message: `${version} sürümüne güncelleme başlatıldı`,
      update_status: 'progress',
      progress: 0,
      estimated_time: 300 // saniye cinsinden
    });
  } catch (error) {
    console.error('Güncelleme başlatılırken hata oluştu:', error);
    return NextResponse.json({ 
      error: 'Sunucu hatası' 
    }, { status: 500 });
  }
} 