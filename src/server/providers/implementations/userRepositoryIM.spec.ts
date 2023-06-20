import { describe, expect, it, vi } from 'vitest';
import UserRepositoryIM from './userRepositoryIM';

describe('UserRepositoryIM', () => {
  it('should be defined', () => {
    expect(UserRepositoryIM).toBeDefined();
  });

  const repository = new UserRepositoryIM();

  it('should be instantiated', () => {
    expect(repository).toBeDefined();
    expect(repository).instanceOf(UserRepositoryIM);
  });

  it('should to return a void list of users', async () => {
    const list = await repository.readAll();

    expect(list).toBeDefined();
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(0);
  });

  it('should to create a user', async () => {
    const dtoMock = vi.spyOn(repository, 'create');

    await repository.create({
      id: 'test id',
      username: 'test name',
      email: 'test email',
      password: 'XXXXXXXXXXXXX',
    });

    expect(dtoMock).toHaveBeenCalled();
  });

  it('should to return a duplicated user by username', async () => {
    const duplicatedUser = await repository.findDuplicatedUsername('test name');

    expect(duplicatedUser).toBeDefined();
    expect(duplicatedUser).toBeInstanceOf(Object);
    expect(duplicatedUser).toHaveProperty('id', 'test id');
    expect(duplicatedUser).toHaveProperty('username', 'test name');
    expect(duplicatedUser).toHaveProperty('email', 'test email');
    expect(duplicatedUser).toHaveProperty('password', 'XXXXXXXXXXXXX');
  });

  it('should to return a duplicated user by email', async () => {
    const duplicatedUser = await repository.findDuplicatedEmail('test email');

    expect(duplicatedUser).toBeDefined();
    expect(duplicatedUser).toBeInstanceOf(Object);
    expect(duplicatedUser).toHaveProperty('id', 'test id');
    expect(duplicatedUser).toHaveProperty('username', 'test name');
    expect(duplicatedUser).toHaveProperty('email', 'test email');
    expect(duplicatedUser).toHaveProperty('password', 'XXXXXXXXXXXXX');
  });

  it('should to return null if not found a duplicated user by username', async () => {
    const duplicatedUser = await repository.findDuplicatedUsername('test2');

    expect(duplicatedUser).toBeNull();
  });

  it('should to return null if not found a duplicated user by email', async () => {
    const duplicatedUser = await repository.findDuplicatedEmail('test2');

    expect(duplicatedUser).toBeNull();
  });

  it('should to create a new user and return a list including new user', async () => {
    const dtoMock = vi.spyOn(repository, 'create');

    await repository.create({
      id: 'test id',
      username: 'test name',
      email: 'test email',
      password: 'XXXXXXXXXXXXX',
    });

    const list = await repository.readAll();

    expect(dtoMock).toHaveBeenCalled();
    expect(list).toBeDefined();
    expect(list).toBeInstanceOf(Array);
    expect(list).toHaveLength(2);

    const newPost = list[list.length - 1];
    expect(newPost).toBeDefined();
    expect(newPost).toBeInstanceOf(Object);
    expect(newPost).toHaveProperty('id', 'test id');
    expect(newPost).toHaveProperty('username', 'test name');
    expect(newPost).toHaveProperty('email', 'test email');
    expect(newPost).toHaveProperty('password', 'XXXXXXXXXXXXX');
  });

  it('should to return a user by id', async () => {
    const user = await repository.readOne('test id');

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(Object);
    expect(user).toHaveProperty('id', 'test id');
    expect(user).toHaveProperty('username', 'test name');
    expect(user).toHaveProperty('email', 'test email');
    expect(user).toHaveProperty('password', 'XXXXXXXXXXXXX');
  });
});
