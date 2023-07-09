import type User from '@serverEntities/user';
import type UserRepository from '@serverRepositories/userRepository';

class UserRepositoryIM implements UserRepository {
  private readonly users: User[] = [];
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) ?? null;
  }

  async readOne(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async findDuplicatedEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findDuplicatedUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) ?? null;
  }

  public async create(user: User): Promise<void> {
    this.users.push(user);
  }

  public async readAll(): Promise<User[]> {
    return this.users;
  }
}

export default UserRepositoryIM;
