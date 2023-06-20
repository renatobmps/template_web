import { describe, expect, it } from 'vitest';
import InMemoryPostRepository from '@serverProviders/implementations/postRepositoryIM';
import type GeneralError from '@errors/GeneralError';
import CreatePost from './createPost';

describe('CreatePost', () => {
  const dto = new InMemoryPostRepository();

  it('should be defined', () => {
    expect(CreatePost).toBeDefined();
  });

  it('should create a post', async () => {
    const postData = {
      title: 'Test',
      body: 'Some body with more than 5 characters',
      user: '1',
      id: '',
    };
    const createPost = new CreatePost(dto);

    const post = await createPost.execute(postData);

    expect(post).toBeDefined();

    postData.id = post.id;
    expect(post).toMatchObject(postData);
  });

  it('should throw an error if the title is less than 5 characters', async () => {
    const postData = {
      title: 'Test error',
      body: 'a',
      user: 'X',
    };
    const createPost = new CreatePost(dto);

    try {
      await createPost.execute(postData);
    } catch (error) {
      const generalError = error as GeneralError;
      expect(generalError.message).toEqual(
        'Body must be at least 5 characters',
      );
    }
  });
});
