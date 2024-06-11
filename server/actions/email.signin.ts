'use server';

import { LoginSchema } from '@/types/login-schema';
import { createSafeActionClient } from 'next-safe-action';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '../schema';

const action = createSafeActionClient();

export const emailSiginIn = action(
  LoginSchema,
  async ({ email, password, code }) => {
    // Check if the user exist on the db
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: 'Email not found' };
    }

    // For handling email verification
    // if(!existingUser.emailVerified){

    // }

    console.log(email, password, code);
    return { success: email };
  }
);
