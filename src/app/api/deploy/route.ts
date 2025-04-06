import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    // GitHub webhook secret'ını kontrol et
    const signature = req.headers.get('x-hub-signature-256');
    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 401 });
    }

    // Webhook secret'ını .env'den al
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Değişiklikleri çek ve uygulamayı yeniden başlat
    const commands = [
      'git pull',
      'npm install',
      'npm run build',
      'pm2 restart smsonaypaneli'
    ];

    for (const command of commands) {
      await execAsync(command);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Deployment error:', error);
    return NextResponse.json({ error: 'Deployment failed' }, { status: 500 });
  }
} 