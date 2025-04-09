import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

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

    // Servis bazlı istatistikler - raw query kullanarak
    const serviceStats = await prisma.$queryRaw<Array<{
      serviceId: number | null;
      _count: { id: number };
      _sum: { amount: number | null };
    }>>`
      SELECT 
        "serviceId", 
        COUNT(*) as "_count.id", 
        SUM(amount) as "_sum.amount"
      FROM Transaction
      WHERE 
        type = 'purchase' 
        AND status = 'completed'
        AND "serviceId" IS NOT NULL
        ${startDate && endDate ? Prisma.sql`AND "createdAt" >= ${new Date(startDate)} AND "createdAt" <= ${new Date(endDate)}` : Prisma.empty}
      GROUP BY "serviceId"
    `;

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

    // Günlük istatistikler - raw query kullanarak
    const dailyStats = await prisma.$queryRaw<Array<{
      createdAt: Date;
      _count: { id: number };
      _sum: { amount: number | null };
    }>>`
      SELECT 
        DATE("createdAt") as "createdAt", 
        COUNT(*) as "_count.id", 
        SUM(amount) as "_sum.amount"
      FROM Transaction
      WHERE 
        type = 'purchase' 
        AND status = 'completed'
        ${startDate && endDate ? Prisma.sql`AND "createdAt" >= ${new Date(startDate)} AND "createdAt" <= ${new Date(endDate)}` : Prisma.empty}
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt")
    `;

    // Günlük istatistikleri formatla
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