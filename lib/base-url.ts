import { type } from 'os';

export default function getBaseURL() {
  if (typeof window !== 'undefined') return '';
  //   VERCEL sets us a custome url when we first deploy our app to vercel
  //   so above we're checking if that url exist, then return our own custom url we set.
  if (process.env.VERCEL_URL) {
    return `https://${process.env.DOMAIN_URL}`;
  } else {
    return 'http://localhost:3000';
  }
}
