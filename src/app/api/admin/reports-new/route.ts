import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // URL'den tarih parametrelerini al
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Tarih filtrelerini oluştur
    const dateFilter = startDate && endDate
      ? {
          createdAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }
      : {};

    // Toplam sipariş sayısı
    const totalOrders = await prisma.transaction.count({
      where: {
        ...dateFilter,
        type: 'purchase',
        status: 'completed',
      },
    });

    // Toplam gelir
    const totalRevenue = await prisma.transaction.aggregate({
      where: {
        ...dateFilter,
        type: 'purchase',
        status: 'completed',
      },
      _sum: {
        amount: true,
      },
    });

    // Tüm servisleri al
    const services = await prisma.service.findMany();
    
    // Servis bazlı istatistikleri hesapla
    const serviceDetails = await Promise.all(
      services.map(async (service) => {
        // Servis için işlemleri say
        const serviceOrders = await prisma.transaction.count({
          where: {
            ...dateFilter,
            type: 'purchase',
            status: 'completed',
            // @ts-ignore - Prisma type issue with serviceId
            serviceId: service.id,
          },
        });
        
        // Servis için geliri hesapla
        const serviceRevenue = await prisma.transaction.aggregate({
          where: {
            ...dateFilter,
            type: 'purchase',
            status: 'completed',
            // @ts-ignore - Prisma type issue with serviceId
            serviceId: service.id,
          },
          _sum: {
            amount: true,
          },
        });
        
        const revenue = serviceRevenue._sum?.amount || 0;
        const profit = revenue * 0.3; // %30 kar marjı
        
        return {
          id: service.id,
          name: service.name,
          totalOrders: serviceOrders,
          successRate: 98.5, // Bu değer gerçek verilerden hesaplanmalı
          revenue: `₺${revenue.toLocaleString()}`,
          profit: `₺${profit.toLocaleString()}`,
          profitMargin: 30,
        };
      })
    );

    // Günlük istatistikleri hesapla
    // Önce tüm tarihleri al
    const allDates = await prisma.transaction.findMany({
      where: {
        ...dateFilter,
        type: 'purchase',
        status: 'completed',
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    
    // Tarihleri grupla
    const dateMap = new Map();
    
    for (const transaction of allDates) {
      const date = transaction.createdAt.toISOString().split('T')[0];
      if (!dateMap.has(date)) {
        dateMap.set(date, {
          date,
          orders: 0,
          revenue: 0,
        });
      }
      dateMap.get(date).orders += 1;
    }
    
    // Her tarih için geliri hesapla
    const formattedDailyStats = await Promise.all(
      Array.from(dateMap.entries()).map(async ([date, stat]) => {
        const dailyRevenue = await prisma.transaction.aggregate({
          where: {
            ...dateFilter,
            type: 'purchase',
            status: 'completed',
            createdAt: {
              gte: new Date(date),
              lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
            },
          },
          _sum: {
            amount: true,
          },
        });
        
        const revenue = dailyRevenue._sum?.amount || 0;
        const profit = revenue * 0.3; // %30 kar marjı
        
        return {
          date,
          orders: stat.orders,
          revenue: `₺${revenue.toLocaleString()}`,
          profit: `₺${profit.toLocaleString()}`,
        };
      })
    );

    // Toplam kar hesapla
    const totalProfit = (totalRevenue._sum?.amount || 0) * 0.3;
    const profitMargin = 30; // Sabit %30 kar marjı

    return NextResponse.json({
      summary: {
        totalOrders,
        totalRevenue: `₺${(totalRevenue._sum?.amount || 0).toLocaleString()}`,
        totalProfit: `₺${totalProfit.toLocaleString()}`,
        profitMargin: `${profitMargin}%`,
      },
      serviceStats: serviceDetails,
      dailyStats: formattedDailyStats,
    });
  } catch (error) {
    console.error('Reports API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate reports' },
      { status: 500 }
    );
  }
} 