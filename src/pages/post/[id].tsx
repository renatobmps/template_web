// eslint-disable-next-line prettier/prettier
import { type GetStaticPaths, type GetStaticProps } from 'next';
// eslint-disable-next-line prettier/prettier
import { type PostProps } from '@serverEntities/post';

interface PageProps {
  data: PostProps;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const request = await fetch(`${process.env.HOST as string}/api/post`);
    const data = await request.json();
    const { posts } = data as { posts: PostProps[] };

    return {
      paths: posts.map((post) => `/post/${post.id}`),
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async (
  ctx,
): Promise<{ props: PageProps }> => {
  try {
    if (!ctx.params?.id) throw new Error('id required');

    const { id } = ctx.params;
    if (typeof id !== 'string') throw new Error('id must be a string');
    const request = await fetch(`${process.env.HOST as string}/api/post/${id}`);
    const data = await request.json();
    const post: PostProps = data.posts;

    return {
      props: {
        data: post,
      },
    };
  } catch (error) {
    return {
      props: {
        data: {
          body: 'Not Found',
          id: '0',
          title: 'Not Found',
          user: 'XXXXXXXXX',
        },
      },
    };
  }
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
