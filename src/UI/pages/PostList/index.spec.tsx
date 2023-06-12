import { beforeEach, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostList from '.';

describe('PostList', () => {
  it('should be defined', () => {
    expect(PostList).toBeDefined();
  });

  beforeEach(() => {
    render(
      <PostList
        posts={[
          {
            id: '1',
            link: 'http://mysite.com/post/1',
            title: 'My first post',
          },
          {
            id: '2',
            link: 'http://mysite.com/post/2',
            title: 'My second post',
          },
          {
            id: '3',
            link: 'http://mysite.com/post/3',
            title: 'My third post',
          },
        ]}
      />,
    );
  });

  it('should render', () => {
    screen.getByText('Posts');
    screen.getByText('My first post');
    screen.getByText('My second post');
    screen.getByText('My third post');
  });

  it('should has correct links', () => {
    expect(screen.getByText('My first post').closest('a')).toHaveAttribute(
      'href',
      'http://mysite.com/post/1',
    );
    expect(screen.getByText('My second post').closest('a')).toHaveAttribute(
      'href',
      'http://mysite.com/post/2',
    );
    expect(screen.getByText('My third post').closest('a')).toHaveAttribute(
      'href',
      'http://mysite.com/post/3',
    );
  });
});
