import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Post from '.';

describe('Post', () => {
  it('should to be declared', () => {
    expect(Post).toBeDefined();
  });

  it('should to render a post page', () => {
    const { getByText } = render(
      <Post
        data={{
          title: 'My new post title',
          body: 'Some post body to test',
          user: 'john_doe',
        }}
      />,
    );

    expect(getByText('My new post title')).toBeInTheDocument();
    expect(getByText('Some post body to test')).toBeInTheDocument();
    expect(getByText('Posted by: john_doe')).toBeInTheDocument();
  });
});
