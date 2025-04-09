import { NextRequest, NextResponse } from 'next/server';
import { getAiConfig, updateAiConfig } from '@/lib/aiService';

export async function GET() {
  try {
    const config = await getAiConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('AI ayarları alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'AI ayarları alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { enabled, apiKey, model } = data;

    // API anahtarını doğrula
    if (apiKey && !apiKey.startsWith('sk-')) {
      return NextResponse.json(
        { error: 'Geçersiz OpenAI API anahtarı' },
        { status: 400 }
      );
    }

    // Ayarları güncelle
    await updateAiConfig({
      enabled: enabled ?? false,
      apiKey: apiKey || null,
      model: model || 'gpt-3.5-turbo'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AI ayarları güncellenirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'AI ayarları güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 