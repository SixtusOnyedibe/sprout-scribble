import { auth } from '@/server/auth.config';
import { UserButton } from './user-button';
import Link from 'next/link';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';

export default async function Nav() {
  const session = await auth();
  return (
    <header className='w-full p-8'>
      <nav>
        <ul className='flex justify-between'>
          <li>Logo</li>
          <li>
            {!session ? (
              <Button asChild>
                <Link
                  className='flex gap-2'
                  aria-label='sign-in'
                  href={'/auth/login'}
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              </Button>
            ) : (
              <UserButton expires={session?.expires} user={session?.user} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
