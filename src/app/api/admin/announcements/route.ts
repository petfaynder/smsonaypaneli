import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Tüm duyuruları getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const announcements = await prisma.announcement.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Duyurular alınırken hata:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Yeni duyuru oluştur
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, type } = await request.json();

    if (!title || !content || !type) {
      return NextResponse.json(
        { message: 'Title, content and type are required' },
        { status: 400 }
      );
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        type,
        active: true,
      }
    });

    return NextResponse.json(announcement);
  } catch (error) {
    console.error('Duyuru oluşturulurken hata:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 