/* eslint-disable prettier/prettier */
import { type Prisma, PrismaClient } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Post, { PostProps } from '@serverEntities/post';
import type PostRepository from '@serverRepositories/postRepository';

export default class PostRepositoryPrisma implements PostRepository {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(post: Post): Promise<void> {
    await this.prisma.post.create({
      data: {
        body: post.body,
        title: post.title,
        user: post.user,
        id: post.id,
      },
    });
  }

  async findDuplicatedTitle(title: string): Promise<PostProps | null> {
    const duplicated = await this.prisma.post.findFirst({
      where: {
        title,
      },
    });

    return duplicated ?? null;
  }

  async readAll(): Promise<Array<{ id: string; title: string; link: string }>> {
    try {
      const posts = await this.prisma.post.findMany({
        select: {
          id: true,
          title: true,
        },
      });

      return posts.map((post) => ({
        ...post,
        link: `${process.env.HOST as string}/post/${post.id}`,
      }));
    } catch (error) {
      return [];
    }
  }

  async readOne(id: string): Promise<PostProps | null> {
    const onePost = await this.prisma.post.findFirst({
      where: {
        id,
      },
    });

    return onePost ?? null;
  }
}
