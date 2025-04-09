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

    // Servis bazlı istatistikler
    // @ts-ignore - Prisma type issue with groupBy
    const serviceStats = await prisma.transaction.groupBy({
      by: ['serviceId'],
      where: {
        ...dateFilter,
        type: 'purchase',
        status: 'completed',
        serviceId: {
          not: null,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      },
    });

    // Servis ID'lerini çıkar
    const serviceIds = serviceStats
      .map(stat => stat.serviceId)
      .filter((id): id is number => id !== null);

    // Servis detaylarını al
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: serviceIds,
        },
      },
    });

    // Servis istatistiklerini birleştir
    // @ts-ignore - Prisma type issue with groupBy result
    const serviceDetails = serviceStats.map(stat => {
      const serviceId = stat.serviceId as number;
      const service = services.find(s => s.id === serviceId);
      const revenue = stat._sum?.amount || 0;
      const profit = revenue * 0.3; // %30 kar marjı

      return {
        id: serviceId,
        name: service?.name || 'Bilinmeyen Servis',
        totalOrders: stat._count?.id || 0,
        successRate: 98.5, // Bu değer gerçek verilerden hesaplanmalı
        revenue: `₺${revenue.toLocaleString()}`,
        profit: `₺${profit.toLocaleString()}`,
        profitMargin: 30,
      };
    });

    // Günlük istatistikler
    // @ts-ignore - Prisma type issue with groupBy
    const dailyStats = await prisma.transaction.groupBy({
      by: ['createdAt'],
      where: {
        ...dateFilter,
        type: 'purchase',
        status: 'completed',
      },
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      },
    });

    // Günlük istatistikleri formatla
    // @ts-ignore - Prisma type issue with groupBy result
    const formattedDailyStats = dailyStats.map(stat => {
      const revenue = stat._sum?.amount || 0;
      const profit = revenue * 0.3; // %30 kar marjı

      return {
        date: stat.createdAt.toISOString().split('T')[0],
        orders: stat._count?.id || 0,
        revenue: `₺${revenue.toLocaleString()}`,
        profit: `₺${profit.toLocaleString()}`,
      };
    });

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