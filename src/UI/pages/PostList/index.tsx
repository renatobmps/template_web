import { type CSSProperties } from 'react';
import { type ListAllPostsResponse } from '@serverUseCases/listAllPosts';

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

export default function PostList({ posts }: PostListProps): JSX.Element {
  return (
    <div>
      <h1>Posts</h1>
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
