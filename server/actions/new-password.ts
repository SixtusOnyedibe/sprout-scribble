'use server';

import { NewPasswordSchema } from '@/types/new-password-schema';
import { createSafeActionClient } from 'next-safe-action';
import { getPasswordResetTokenByToken } from './tokens';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { passwordResetTokens, users } from '../schema';
import bcrypt from 'bcrypt';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const action = createSafeActionClient();

export const newPassword = action(
  NewPasswordSchema,
  async ({ password, token }) => {
    const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
    const dbPool = drizzle(pool);
    // TO check the token, if they don't have the token, they shouldn't be allowed to login
    if (!token) {
      return { error: 'Missing Token' };
    }
    // Checking if the token is valid
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return { error: 'Token not found' };
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: 'Token has expired' };
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    });

    if (!existingUser) {
      return { error: 'User not found' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password
    // The approach we would be taking here is transaction when one of our query fails, we should just revert back the entire operation/query.
    await dbPool.transaction(async (tx) => {
      // the tx here is for context and we can use it the same way we use db. eg tx.query
      await tx
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.id, existingUser.id));

      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id));
    });
    return { success: 'Password Updated' };
  }
);
