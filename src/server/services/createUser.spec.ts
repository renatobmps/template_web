import { describe } from 'vitest';
import UserRepositoryIM from '@serverRepositories/implementations/userRepositoryIM';
import CreateUser from './createUser';

describe('CreateUser', () => {
  it('should be defined', () => {
    expect(CreateUser).toBeDefined();
  });

  const dto = new UserRepositoryIM();

  it('should to be instantiated', () => {
    expect(dto).toBeDefined();
    expect(dto).toBeInstanceOf(UserRepositoryIM);
    expect(new CreateUser(dto)).toBeDefined();
  });

  const validData = {
    username: 'john_doe3',
    password: '-3L+eE6d#q9DBz!T',
    email: 'john.doe3@gmail.com',
  };

  it('should create a new user', async () => {
    const createUser = new CreateUser(dto);
    const user = await createUser.execute(validData);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe('string');
    expect(user.id.length).toBeGreaterThanOrEqual(10);
    expect(user.username).toBe(validData.username);
    expect(user.email).toBe(validData.email);
    expect(user.password).not.toBeDefined();
  });

  it('should to throw an error when email already exists', async () => {
    const newDto = new UserRepositoryIM();
    const createUser = new CreateUser(newDto);
    await createUser.execute(validData);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(
      // eslint-disable-next-line prettier/prettier, no-return-await
      async () => await createUser.execute({ ...validData, username: 'another_one' })
    ).rejects.toThrow('email already exists');
  });

  it('should to throw an error when username already exists', async () => {
    const newDto = new UserRepositoryIM();
    const createUser = new CreateUser(newDto);
    await createUser.execute(validData);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(
      // eslint-disable-next-line prettier/prettier, no-return-await, @typescript-eslint/object-curly-spacing
      async () => await createUser.execute({...validData, email: 'john.doe4@gmail.com', })
    ).rejects.toThrow('username already exists');
  });
});
