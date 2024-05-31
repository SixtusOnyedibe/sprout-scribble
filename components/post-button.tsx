'use client';

import { useFormStatus } from 'react-dom';

export default function PostButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='bg-blue-600 py-2 px-4 disabled:opacity-15 text-white ml-3 rounded-lg'
    >
      Submit
    </button>
  );
}
