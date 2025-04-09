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

    // Tüm tamamlanmış işlemleri al
    const transactions = await prisma.transaction.findMany({
      where: {
        ...dateFilter,
        type: 'purchase',
        status: 'completed',
        serviceId: {
          not: null,
        },
      },
      include: {
        service: true,
      },
    });

    // Servis bazlı istatistikleri hesapla
    const serviceStatsMap = new Map();
    
    for (const transaction of transactions) {
      if (!transaction.serviceId) continue;
      
      const serviceId = transaction.serviceId;
      if (!serviceStatsMap.has(serviceId)) {
        serviceStatsMap.set(serviceId, {
          id: serviceId,
          name: transaction.service?.name || 'Bilinmeyen Servis',
          totalOrders: 0,
          revenue: 0,
        });
      }
      
      const stat = serviceStatsMap.get(serviceId);
      stat.totalOrders += 1;
      stat.revenue += transaction.amount;
    }
    
    // Servis istatistiklerini diziye dönüştür
    const serviceDetails = Array.from(serviceStatsMap.values()).map(stat => {
      const profit = stat.revenue * 0.3; // %30 kar marjı
      
      return {
        id: stat.id,
        name: stat.name,
        totalOrders: stat.totalOrders,
        successRate: 98.5, // Bu değer gerçek verilerden hesaplanmalı
        revenue: `₺${stat.revenue.toLocaleString()}`,
        profit: `₺${profit.toLocaleString()}`,
        profitMargin: 30,
      };
    });

    // Günlük istatistikleri hesapla
    const dailyStatsMap = new Map();
    
    for (const transaction of transactions) {
      const date = transaction.createdAt.toISOString().split('T')[0];
      
      if (!dailyStatsMap.has(date)) {
        dailyStatsMap.set(date, {
          date,
          orders: 0,
          revenue: 0,
        });
      }
      
      const stat = dailyStatsMap.get(date);
      stat.orders += 1;
      stat.revenue += transaction.amount;
    }
    
    // Günlük istatistikleri diziye dönüştür ve sırala
    const formattedDailyStats = Array.from(dailyStatsMap.values())
      .map(stat => {
        const profit = stat.revenue * 0.3; // %30 kar marjı
        
        return {
          date: stat.date,
          orders: stat.orders,
          revenue: `₺${stat.revenue.toLocaleString()}`,
          profit: `₺${profit.toLocaleString()}`,
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));

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