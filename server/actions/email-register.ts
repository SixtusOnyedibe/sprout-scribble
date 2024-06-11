'use server';

import { RegisterSchema } from '@/types/register-schema';
import { createSafeActionClient } from 'next-safe-action';
import bcrypt from 'bcrypt';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '../schema';
import { generateEmailVerificationToken } from './tokens';
import { send } from 'process';

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, name, password }) => {
    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // check existing user
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // Check if email is already in the database then say it's in use,
    // if it's not, register the user and also send the verification
    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        // await se
        return { success: 'Email confirmation resent' };
      }
      return { error: 'Email already in use' };
    }

    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });

    const verificationToken = await generateEmailVerificationToken(email);
    // await sendverificationEmail()
    return { success: 'Confirmation Email Sent!' };
  }
);
