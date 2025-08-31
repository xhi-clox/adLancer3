import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { verifyAdminPassword } from '@/lib/auth';
import { createSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const admin = await prisma.user.findFirst({ where: { name: username, isAdmin: true } });
  if (!admin || !admin.password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const valid = await verifyAdminPassword(password, admin.password);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  // Set session/cookie for admin
  await createSession({ userId: admin.id, isAdmin: true });
  return NextResponse.json({ admin });
}
