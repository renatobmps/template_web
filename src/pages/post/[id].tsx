import { type GetStaticProps, type GetStaticPaths } from 'next';
import { type PostProps } from 'src/server/entities/post';

interface PageProps {
  data: PostProps;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const request = await fetch('http://localhost:3000/api/post');
  const data = await request.json();
  const { posts } = data as { posts: PostProps[] };

  return {
    paths: posts.map((post) => `/post/${post.id}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx,
): Promise<{ props: PageProps }> => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!ctx.params?.id) throw new Error('id required');

  const { id } = ctx.params;
  if (typeof id !== 'string') throw new Error('id must be a string');
  const request = await fetch(`http://localhost:3000/api/post/${id}`);
  const data = await request.json();
  const post: PostProps = data.posts;

  return {
    props: {
      data: post,
    },
  };
};

export default function Page({ data }: PageProps): JSX.Element {
  return (
    <article>
      <header>
        <h1>{data.title}</h1>
      </header>
      <main>{data.body}</main>
      <footer>
        <p>Posted by: {data.user}</p>
      </footer>
    </article>
  );
}
