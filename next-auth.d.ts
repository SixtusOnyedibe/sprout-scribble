import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendUser = DefaultSession['user'] & {
  //here we extended the session type and added ours so that we can get the type safety
  id: string;
  role: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  image: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendUser;
  }
}
