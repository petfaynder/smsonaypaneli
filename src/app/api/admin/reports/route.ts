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
    const serviceStats = await prisma.transaction.groupBy({
      by: ['serviceId'],
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

    // Servis detaylarını al
    const services = await prisma.service.findMany({
      where: {
        id: {
          in: serviceStats.map(stat => stat.serviceId),
        },
      },
    });

    // Servis istatistiklerini birleştir
    const serviceDetails = serviceStats.map(stat => {
      const service = services.find(s => s.id === stat.serviceId);
      const revenue = stat._sum.amount || 0;
      const profit = revenue * 0.3; // %30 kar marjı

      return {
        id: stat.serviceId,
        name: service?.name || 'Bilinmeyen Servis',
        totalOrders: stat._count.id,
        successRate: 98.5, // Bu değer gerçek verilerden hesaplanmalı
        revenue: `₺${revenue.toLocaleString()}`,
        profit: `₺${profit.toLocaleString()}`,
        profitMargin: 30,
      };
    });

    // Günlük istatistikler
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
    const formattedDailyStats = dailyStats.map(stat => {
      const revenue = stat._sum.amount || 0;
      const profit = revenue * 0.3; // %30 kar marjı

      return {
        date: stat.createdAt.toISOString().split('T')[0],
        orders: stat._count.id,
        revenue: `₺${revenue.toLocaleString()}`,
        profit: `₺${profit.toLocaleString()}`,
      };
    });

    // Toplam kar hesapla
    const totalProfit = (totalRevenue._sum.amount || 0) * 0.3;
    const profitMargin = 30; // Sabit %30 kar marjı

    return NextResponse.json({
      summary: {
        totalOrders,
        totalRevenue: `₺${(totalRevenue._sum.amount || 0).toLocaleString()}`,
        totalProfit: `₺${totalProfit.toLocaleString()}`,
        profitMargin: `${profitMargin}%`,
      },
      serviceStats: serviceDetails,
      dailyStats: formattedDailyStats,
    });
  } catch (error) {
    console.error('Rapor verisi alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Rapor verisi alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 