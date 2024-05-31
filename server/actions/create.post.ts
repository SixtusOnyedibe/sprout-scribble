'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../index';
import { posts } from '../schema';

export default async function createPosts(formData: FormData) {
  const title = formData.get('title')?.toString();
  if (!title) {
    return { error: 'Title is required!' };
  }

  revalidatePath('/');
  const post = await db.insert(posts).values({
    title,
  });

  return { success: post };
  //   return { success: 'Post created!' };
}
