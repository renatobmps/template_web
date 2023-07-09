import { describe, expect, it, vi } from 'vitest';
import InMemoryPostRepository from '@serverRepositories/implementations/postRepositoryIM';
import CreatePost from './createPost';
import ListOnePost from './listOnePost';

describe('ListOnePost.ts', () => {
  const dto = new InMemoryPostRepository();
  const listOnePost = new ListOnePost(dto);

  it('should be defined', () => {
    expect(ListOnePost).toBeDefined();
  });

  it('not should to bring a post', async () => {
    expect(await listOnePost.execute({ postId: 'test' })).toBe(null);
  });

  it('should to bring a post', async () => {
    const createPost = new CreatePost(dto);
    const newPost = {
      body: 'testing list one post flow',
      title: 'testing ListOnePost',
      user: 'john_doe',
    };
    const post = await createPost.execute(newPost);

    const result = await listOnePost.execute({ postId: post.id });

    expect(result).toBeTruthy();
    expect(result?.body).toEqual(newPost.body);
    expect(result?.title).toEqual(newPost.title);
    expect(result?.user).toEqual(newPost.user);
  });

  it('should ListOnePost.execute returns the correct post for a given post ID', async () => {
    const postRepository = {
      readOne: vi.fn().mockResolvedValue({ id: '1', title: 'Post 1' }),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      create: async () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      findDuplicatedTitle: async () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      readAll: async () => { return []; },
    };
    const listOnePostF = new ListOnePost(postRepository);
    const response = await listOnePostF.execute({ postId: '1' });
    expect(response).toEqual({ id: '1', title: 'Post 1' });
    expect(postRepository.readOne).toHaveBeenCalledWith('1');
  });

  it('should ListOnePost.execute throws an error when the post ID is invalid', async () => {
    const postRepository = {
      readOne: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      create: async () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      findDuplicatedTitle: async () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      readAll: async () => { return []; },
    };
    const listOnePostFn = new ListOnePost(postRepository);
    await expect(listOnePostFn.execute({ postId: '' })).rejects.toThrow(
      'Id is required',
    );
    expect(postRepository.readOne).not.toHaveBeenCalled();
  });
});
