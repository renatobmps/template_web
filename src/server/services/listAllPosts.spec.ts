import { describe, expect, it, vi } from 'vitest';
import InMemoryPostRepository from '@serverRepositories/implementations/postRepositoryIM';
import ListAllPosts from './listAllPosts';

describe('ListAllPosts', () => {
  const dto = new InMemoryPostRepository();

  it('should be defined', () => {
    expect(ListAllPosts).toBeDefined();
  });

  it('should to return a list of all posts', async () => {
    const listAllPosts = new ListAllPosts(dto);

    const response = await listAllPosts.execute();

    expect(Array.isArray(response)).toBeTruthy();
    expect(response.length).toBe(0);
  });

  it('should to return a list of all posts', async () => {
    const postTest = {
      id: 'some_id',
      title: 'Some title',
      body: 'Some content',
      user: 'john_doe',
    };
    const postRepository = {
      readAll: vi.fn().mockResolvedValue([postTest]),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      create: async () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      findDuplicatedTitle: async () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      readOne: async () => {},
    };
    const listAllPosts = new ListAllPosts(postRepository);

    const response = await listAllPosts.execute();

    expect(Array.isArray(response)).toBeTruthy();
    expect(response.length).toBe(1);
    expect(response[0]).toMatchObject(postTest);
  });
});
