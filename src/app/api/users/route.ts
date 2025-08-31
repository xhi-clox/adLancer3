import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import { Prisma } from '@prisma/client';

// GET /api/users - list users (admin only)
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || undefined;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');
  const where: Prisma.UserWhereInput = q ? {
    OR: [
      { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
      { telegramId: { contains: q } },
      { email: { contains: q, mode: Prisma.QueryMode.insensitive } },
    ],
  } : {};
  const users = await prisma.user.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { joined: 'desc' },
  });
  const total = await prisma.user.count({ where });
  return NextResponse.json({ users, total });
}
