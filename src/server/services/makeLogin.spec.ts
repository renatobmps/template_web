import { describe, expect, it } from 'vitest';
import UserRepositoryIM from '@serverRepositories/implementations/userRepositoryIM';
import MakeLogin from './makeLogin';
import CreateUser from './createUser';

describe('makeLogin', () => {
  it('should be defined', () => {
    expect(MakeLogin).toBeDefined();
  });

  it('should to be instantiated', () => {
    const dto = new UserRepositoryIM();
    const makeLogin = new MakeLogin(dto);

    expect(makeLogin).toBeDefined();
    expect(makeLogin.execute).toBeDefined();
  });

  it('should to return a token', async () => {
    const dto = new UserRepositoryIM();
    const userData = {
      username: 'john_doe3',
      password: '-3L+eE6d#q9DBz!T',
      email: 'john.doe3@gmail.com',
    };

    const createUser = new CreateUser(dto);
    const makeLogin = new MakeLogin(dto);

    await createUser.execute({
      email: userData.email,
      password: userData.password,
      username: userData.username,
    });

    const userByEmail = await makeLogin.execute({
      login: userData.email,
      password: userData.password,
      loginMethod: 'email',
    });

    const userByUsername = await makeLogin.execute({
      login: userData.username,
      password: userData.password,
      loginMethod: 'username',
    });

    expect(userByEmail.token).toBeDefined();
    expect(typeof userByEmail.token).toBe('string');
    expect(userByEmail.token.length).toBeGreaterThan(10);

    expect(userByUsername.token).toBeDefined();
    expect(typeof userByUsername.token).toBe('string');
    expect(userByUsername.token.length).toBeGreaterThan(10);
  });
});
