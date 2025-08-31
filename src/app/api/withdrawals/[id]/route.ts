import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/session';

// PATCH /api/withdrawals/:id - update withdrawal status (admin only)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const { status } = body;
  if (!['Pending', 'Approved', 'Denied'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const withdrawal = await prisma.withdrawal.update({
    where: { id: params.id },
    data: { status },
  });
  return NextResponse.json({ withdrawal });
}
