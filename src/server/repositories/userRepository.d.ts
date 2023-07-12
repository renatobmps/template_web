import type User from '@serverEntities/user';

export default interface UserRepository {
  readAll(): Promise<User[]>;
  create(user: User): Promise<void>;
  findDuplicatedUsername(username: string): Promise<User | null>;
  findDuplicatedEmail(email: string): Promise<User | null>;
  readOne(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}
