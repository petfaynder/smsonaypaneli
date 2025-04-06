import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  const apiKey = process.env.NEXT_PUBLIC_FIVE_SIM_API_KEY;

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from 5sim.net' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  const apiKey = process.env.NEXT_PUBLIC_FIVE_SIM_API_KEY;
  const body = await request.json();

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from 5sim.net' },
      { status: 500 }
    );
  }
} 