import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticketId = parseInt(params.id);

    // Talebi kapat
    const ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        status: 'closed',
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Talep kapatılırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Talep kapatılırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 