import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/session';

// GET /api/withdrawals - list withdrawals (admin only, filter by status)
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const where = status ? { status } : {};
  const withdrawals = await prisma.withdrawal.findMany({
    where,
    orderBy: { date: 'desc' },
    include: { user: true },
  });
  return NextResponse.json({ withdrawals });
}

// POST /api/withdrawals - create withdrawal (user only)
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.userId || typeof session.userId !== 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const { points, method, details } = body;
  const withdrawal = await prisma.withdrawal.create({
    data: {
      userId: String(session.userId),
      points,
      method,
      details,
      status: 'Pending',
    },
  });
  return NextResponse.json({ withdrawal });
}
