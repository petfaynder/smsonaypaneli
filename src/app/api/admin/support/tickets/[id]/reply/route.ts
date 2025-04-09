import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticketId = parseInt(params.id);
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Yanıt içeriği gereklidir' },
        { status: 400 }
      );
    }

    // Yanıtı oluştur
    const message = await prisma.message.create({
      data: {
        ticketId,
        userId: 0, // Admin ID
        content,
        isAiGenerated: false,
      },
    });

    // Talebi güncelle
    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Yanıt gönderilirken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Yanıt gönderilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 