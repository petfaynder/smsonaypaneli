import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    console.log('Duyuru isteği alındı:', { type });

    const announcements = await prisma.announcement.findMany({
      where: {
        type: type || undefined,
        active: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('Bulunan duyurular:', announcements);

    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Duyurular alınırken hata:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 