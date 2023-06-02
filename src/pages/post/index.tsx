import { type CSSProperties } from 'react';

import { type PostProps } from '@serverEntities/post';

interface PageProps {
  posts: PostProps[];
}

export async function getStaticProps(): Promise<{ props: PageProps }> {
  try {
    const request = await fetch(`${process.env.HOST as string}/api/post`);
    const postsObj = await request.json();
    const { posts } = postsObj;

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    return {
      props: {
        posts: [],
      },
    };
  }
}

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: '2rem 1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
};

const postStyle: CSSProperties = {
  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  borderRadius: '0.5rem',
  padding: '1.5rem 1rem',
  display: 'grid',
  placeItems: 'center',
};

export default function Page({ posts }: PageProps): JSX.Element {
  return (
    <div>
      <h1>Posts</h1>
      <div style={gridStyle}>
        {posts.map((post) => (
          <a key={post.id} href={`/post/${post.id}`} style={postStyle}>
            {post.title}
          </a>
        ))}
      </div>
    </div>
  );
}
