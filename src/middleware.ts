import { NextRequest, NextResponse } from 'next/server';

// Doğrulanacak pathlerin listesi
const API_PATHS = ['/api/sms'];
const DASHBOARD_PATHS = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API istekleri için doğrulama
  if (API_PATHS.some(path => pathname.startsWith(path))) {
    // API isteği doğrulama
    const authHeader = request.headers.get('authorization');
    
    // API anahtarını kontrol et
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Harici API çağrıları için yetkilendirme gerekli
      // Ancak aynı origin'den gelen istekler için atla (kendi web arayüzümüzden yapılan istekler)
      const origin = request.headers.get('origin') || '';
      const host = request.headers.get('host') || '';
      
      // Eğer aynı originden değilse ve kimlik doğrulama yoksa hata ver
      if (!origin.includes(host)) {
        // Geliştirme aşamasında bu kontrolü devre dışı bırakalım
        // return NextResponse.json(
        //   { error: 'Unauthorized - API anahtarı gerekli' },
        //   { status: 401 }
        // );
      }
    }
  }

  // Dashboard erişimi için lisans doğrulama
  if (DASHBOARD_PATHS.some(path => pathname.startsWith(path))) {
    // Server-side lisans doğrulama (geliştirme için şimdilik atlıyoruz)
    // Gerçek uygulamada burada lisans durumu doğrulanmalı
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // API ve Dashboard yollarını eşleştir
    '/api/:path*',
    '/dashboard/:path*',
  ],
}; 