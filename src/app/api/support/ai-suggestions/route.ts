import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getAiConfig } from '@/lib/aiService';

/**
 * AI destekli yanıt önerileri üretir
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { message } = data as { message: string };
    
    if (!message) {
      return NextResponse.json({ 
        error: 'Mesaj alanı gereklidir' 
      }, { status: 400 });
    }
    
    // AI konfigürasyonunu al
    const aiConfig = getAiConfig();
    
    // AI aktif değilse veya API anahtarı yoksa
    if (!aiConfig.enabled || !aiConfig.apiKey) {
      return NextResponse.json({ 
        suggestions: [] 
      });
    }
    
    // OpenAI istemcisini oluştur
    const openai = new OpenAI({
      apiKey: aiConfig.apiKey,
    });
    
    // Sistem talimatları
    const systemPrompt = `Sen bir müşteri hizmetleri temsilcisisin. 
    Kullanıcının sorununa yardımcı olmak için kısa, net ve profesyonel yanıtlar ver. 
    Yanıtların Türkçe olmalı ve SMS onay hizmetleri ile ilgili olmalı. 
    Kullanıcının sorununu çözmeye odaklan ve gereksiz detaylardan kaçın.`;
    
    // Kullanıcı mesajı
    const userPrompt = `Kullanıcı mesajı: "${message}"
    
    Lütfen bu mesaja uygun 3 farklı yanıt önerisi ver. 
    Her yanıt kısa ve öz olmalı, doğrudan sorunu çözmeye odaklanmalı.`;
    
    // OpenAI API'sini çağır
    const completion = await openai.chat.completions.create({
      model: aiConfig.model || "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });
    
    // Yanıtı işle
    const response = completion.choices[0]?.message?.content || "";
    
    // Yanıtı önerilere ayır
    const suggestions = response
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .slice(0, 3); // En fazla 3 öneri
    
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('AI önerileri üretilirken hata oluştu:', error);
    return NextResponse.json({ 
      error: 'AI önerileri üretilirken bir hata oluştu' 
    }, { status: 500 });
  }
} 