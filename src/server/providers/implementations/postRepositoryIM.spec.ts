import { describe, expect, it, vi } from 'vitest';
import PostRepositoryIM from './postRepositoryIM';

describe('PostRepositoryIM', () => {
  const repository = new PostRepositoryIM();

  it('should be defined', () => {
    expect(PostRepositoryIM).toBeDefined();
  });

  it('should to return a void list of posts', async () => {
    const list = await repository.readAll();

    expect(list).toBeDefined();
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(0);
  });

  it('should to create a post', async () => {
    const dtoMock = vi.spyOn(repository, 'create');

    await repository.create({
      title: 'test',
      body: 'test body',
      id: 'test id',
      user: 'john',
    });

    expect(dtoMock).toHaveBeenCalled();
  });

  it('should to return a duplicated post by title', async () => {
    const duplicatedPost = await repository.findDuplicatedTitle('test');

    expect(duplicatedPost).toBeDefined();
    expect(duplicatedPost).toBeInstanceOf(Object);
    expect(duplicatedPost).toHaveProperty('title', 'test');
    expect(duplicatedPost).toHaveProperty('body', 'test body');
    expect(duplicatedPost).toHaveProperty('id', 'test id');
    expect(duplicatedPost).toHaveProperty('user', 'john');
  });

  it('should to return null if not found a duplicated post by title', async () => {
    const duplicatedPost = await repository.findDuplicatedTitle('test2');

    expect(duplicatedPost).toBeNull();
  });

  it('should to create a new post and return a list including new posts', async () => {
    const dtoMock = vi.spyOn(repository, 'create');

    await repository.create({
      title: 'new test',
      body: 'new test body',
      id: 'new test id',
      user: 'XXXX',
    });

    const list = await repository.readAll();

    expect(dtoMock).toHaveBeenCalled();
    expect(list).toBeDefined();
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(2);

    const newPost = list[list.length - 1];
    expect(newPost).toBeDefined();
    expect(newPost).toBeInstanceOf(Object);
    expect(newPost).toHaveProperty('title', 'new test');
    expect(newPost.body).toBeUndefined();
    expect(newPost).toHaveProperty('id', 'new test id');
    expect(newPost.user).toBeUndefined();
    expect(newPost).toHaveProperty(
      'link',
      `${process.env.HOST as string}/api/post/${newPost.id}`,
    );
  });

  it('should to return a post by id', async () => {
    const post = await repository.readOne('test id');

    expect(post).toBeDefined();
    expect(post).toBeInstanceOf(Object);
    expect(post).toHaveProperty('title', 'test');
    expect(post).toHaveProperty('body', 'test body');
    expect(post).toHaveProperty('id', 'test id');
    expect(post).toHaveProperty('user', 'john');
  });
});
