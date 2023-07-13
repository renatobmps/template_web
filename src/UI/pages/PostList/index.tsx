import { type CSSProperties, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { type ListAllPostsResponse } from '@serverUseCases/listAllPosts';
import Header from './Header';

export interface PostListProps {
  posts: ListAllPostsResponse;
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

export default function PostList({ posts = [] }: PostListProps): JSX.Element {
  const [cookies] = useCookies(['token']);
  const [isLogged, setLogin] = useState<boolean | null>(null);
  useEffect(() => {
    if (cookies.token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [cookies]);

  return (
    <div>
      <Header isLogged={isLogged} setLogin={setLogin} />
      <h1>Posts</h1>
      {!posts.length && <span>No posts</span>}
      <div style={gridStyle}>
        {posts.map((post) => (
          <a key={post.id} href={post.link} style={postStyle}>
            {post.title}
          </a>
        ))}
      </div>
    </div>
  );
}
