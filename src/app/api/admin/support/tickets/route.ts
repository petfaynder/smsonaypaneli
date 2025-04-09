import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Destek talepleri alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Destek talepleri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 