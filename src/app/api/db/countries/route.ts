import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const countries = await prisma.country.findMany();
    return NextResponse.json(countries);
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const country = await prisma.country.create({
      data: {
        code: data.code,
        name: data.name,
        flag: data.flag,
        available: data.available
      }
    });
    return NextResponse.json(country);
  } catch (error) {
    console.error('Failed to create country:', error);
    return NextResponse.json({ error: 'Failed to create country' }, { status: 500 });
  }
} 