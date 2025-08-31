import crypto from 'crypto';
import prisma from './db';
import bcrypt from 'bcryptjs';

// Telegram login verification
export function verifyTelegramAuth(data: Record<string, string>, botToken: string): boolean {
  const authData = { ...data };
  const hash = authData.hash;
  delete authData.hash;

  const sorted = Object.keys(authData)
    .sort()
    .map(key => `${key}=${authData[key]}`)
    .join('\n');

  const secret = crypto.createHash('sha256').update(botToken).digest();
  const hmac = crypto.createHmac('sha256', secret).update(sorted).digest('hex');

  return hmac === hash;
}

// Admin password verification
export async function verifyAdminPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Hash admin password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
