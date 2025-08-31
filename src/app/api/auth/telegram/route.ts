import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyTelegramAuth } from '@/lib/auth';
import { createSession } from '@/lib/session';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!verifyTelegramAuth(body, BOT_TOKEN)) {
    return NextResponse.json({ error: 'Invalid Telegram authentication' }, { status: 401 });
  }

  // Find or create user
  const { id, first_name, last_name, username, photo_url } = body;
  let user = await prisma.user.findUnique({ where: { telegramId: id } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId: id,
        name: `${first_name || ''} ${last_name || ''}`.trim() || username,
        status: 'Active',
      },
    });
  }

  // Set session/cookie for user
  await createSession({ userId: user.id, telegramId: user.telegramId, isAdmin: user.isAdmin });
  return NextResponse.json({ user });
}
