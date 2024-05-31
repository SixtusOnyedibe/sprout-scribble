import getPosts from '../server/actions/get-posts';
import createPosts from '../server/actions/create.post';
import PostButton from '../components/post-button';

export default async function Home() {
  const { error, success } = await getPosts();
  if (error) {
    throw new Error(error);
  }
  if (success)
    return (
      <main>
        {success.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
          </div>
        ))}

        <form action={createPosts}>
          <input type='text' placeholder='Title' name='title' />
          <PostButton />
        </form>
      </main>
    );
}
