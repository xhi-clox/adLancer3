import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/session';

// POST /api/adwatch - record ad view and award points
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.userId || typeof session.userId !== 'string') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const { pointsEarned = 1 } = body; // Default to 1 point per ad

  // Record ad watch
  const adWatch = await prisma.adWatch.create({
    data: {
      userId: session.userId,
      pointsEarned,
    },
  });

  // Update user points
  await prisma.user.update({
    where: { id: session.userId },
    data: { points: { increment: pointsEarned } },
  });

  return NextResponse.json({ adWatch });
}
