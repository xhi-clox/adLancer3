import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/session';

// GET /api/stats - dashboard statistics
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.userId && !session?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.isAdmin) {
    // Admin dashboard stats
    const totalUsers = await prisma.user.count();
    const pendingWithdrawals = await prisma.withdrawal.count({ where: { status: 'Pending' } });
    const totalReferrals = await prisma.referral.count();
    const totalAdsWatched = await prisma.adWatch.count();
    return NextResponse.json({
      totalUsers,
      pendingWithdrawals,
      totalReferrals,
      totalAdsWatched,
    });
  } else {
    // User dashboard stats
    const userId = String(session.userId);
    const points = (await prisma.user.findUnique({ where: { id: userId } }))?.points || 0;
    const withdrawals = await prisma.withdrawal.findMany({ where: { userId } });
    const referrals = await prisma.referral.count({ where: { referrerId: userId } });
    const adsWatched = await prisma.adWatch.count({ where: { userId } });
    return NextResponse.json({
      points,
      withdrawals,
      referrals,
      adsWatched,
    });
  }
}
