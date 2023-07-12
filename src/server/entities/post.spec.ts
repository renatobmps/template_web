import { describe, expect, it } from 'vitest';
import Post from './post';

describe('Post', () => {
  const validPostData = {
    body: 'My new post',
    title: 'My new title',
    user: 'john',
    id: '123',
  };

  it('should be defined', () => {
    expect(Post).toBeDefined();
  });

  it('should to be possible to create a new Post with ID', () => {
    const newPost = new Post(
      {
        body: validPostData.body,
        title: validPostData.title,
        user: validPostData.user,
      },
      validPostData.id,
    );

    expect(newPost).toBeDefined();
    expect(newPost).toBeInstanceOf(Post);
    expect(newPost.id).toBe(validPostData.id);
    expect(newPost.body).toBe(validPostData.body);
    expect(newPost.title).toBe(validPostData.title);
    expect(newPost.user).toBe(validPostData.user);
  });

  it('should to be possible to create a new Post without ID', () => {
    const newPost = new Post({
      body: validPostData.body,
      title: validPostData.title,
      user: validPostData.user,
    });

    expect(newPost).toBeDefined();
    expect(newPost).toBeInstanceOf(Post);
    expect(newPost.id).toBeDefined();
    expect(typeof newPost.id).toBe('string');
    expect(newPost.id.length).toBeGreaterThan(5);
    expect(newPost.body).toBe(validPostData.body);
    expect(newPost.title).toBe(validPostData.title);
    expect(newPost.user).toBe(validPostData.user);
  });

  it('should to throw an error when body has less then 5 characters', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Post({
        body: '123',
        title: validPostData.title,
        user: validPostData.user,
      });
    }).toThrow('Body must be at least 5 characters');
  });

  it('should to throw an error when try to change body to less then 5 characters', () => {
    const newPost = new Post({
      body: validPostData.body,
      title: validPostData.title,
      user: validPostData.user,
    });

    expect(() => {
      newPost.body = '123';
    }).toThrow('Body must be at least 5 characters');
  });

  it('should to throw an error when try to update the id value', () => {
    const newPost = new Post({
      body: validPostData.body,
      title: validPostData.title,
      user: validPostData.user,
    });

    expect(() => {
      newPost.id = '123';
    }).toThrow('ID cannot be changed. Ignoring attempt to set 123 to ID');
  });

  it('should to throw an error when title has less then 1 character', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Post({
        body: validPostData.body,
        title: '',
        user: validPostData.user,
      });
    }).toThrow('Title must be fielded');
  });

  it('should to throw an error when try to change title to less then 1 character', () => {
    const newPost = new Post({
      body: validPostData.body,
      title: validPostData.title,
      user: validPostData.user,
    });

    expect(() => {
      newPost.title = '';
    }).toThrow('Title must be fielded');
  });

  it('should to throw an error when user has less then 1 character', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Post({
        body: validPostData.body,
        title: validPostData.title,
        user: '',
      });
    }).toThrow('Invalid username');
  });

  it('should to throw an error when try to change user to less then 1 character', () => {
    const newPost = new Post({
      body: validPostData.body,
      title: validPostData.title,
      user: validPostData.user,
    });

    expect(() => {
      newPost.user = '';
    }).toThrow('Invalid username');
  });
});
