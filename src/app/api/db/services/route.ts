import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const service = await prisma.service.create({
      data: {
        name: data.name,
        icon: data.icon,
        price: data.price,
        available: data.available,
        countryPrices: data.countryPrices
      }
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error('Failed to create service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
} 