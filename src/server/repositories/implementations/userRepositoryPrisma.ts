import { type Prisma, PrismaClient } from '@prisma/client';
import type User from '@serverEntities/user';
import type UserRepository from '@serverRepositories/userRepository';

export default class UserRepositoryPrisma implements UserRepository {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async readAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users as User[];
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        username: user.username,
        id: user.id,
      },
    });
  }

  async findDuplicatedUsername(username: string): Promise<User | null> {
    return ((await this.prisma.user.findUnique({
      where: { username },
    })) ?? null) as User;
  }

  async findDuplicatedEmail(email: string): Promise<User | null> {
    return ((await this.prisma.user.findUnique({
      where: { email },
    })) ?? null) as User;
  }

  async readOne(id: string): Promise<User | null> {
    return (
      ((await this.prisma.user.findUnique({
        where: { id },
      })) as User) ?? null
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return (
      ((await this.prisma.user.findUnique({
        where: { email },
      })) as User) ?? null
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    return (
      ((await this.prisma.user.findUnique({
        where: { username },
      })) as User) ?? null
    );
  }
}
