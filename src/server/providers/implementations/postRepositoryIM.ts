import { type PostProps } from '@serverEntities/post';
import type PostRepository from '@serverProviders/postRepository';

type PostWithLink = Omit<PostProps, 'body' | 'user' | 'link'> & {
  link: string;
};

export default class PostRepositoryIM implements PostRepository {
  private readonly posts: PostProps[] = [];

  public async create(post: PostProps): Promise<void> {
    this.posts.push(post);
  }

  public async findDuplicatedTitle(title: string): Promise<PostProps | null> {
    const duplicated = this.posts.find((post) => post.title === title);

    return duplicated ?? null;
  }

  public async readAll(): Promise<PostWithLink[]> {
    try {
      return this.posts.map((post) => ({
        ...post,
        body: undefined,
        user: undefined,
        link: `${process.env.HOST as string}/api/post/${post.id}`,
      }));
    } catch (error) {
      return [];
    }
  }

  public async readOne(id: string): Promise<PostProps | null> {
    const onePost = this.posts.find((post) => post.id === id);

    return onePost ?? null;
  }
}
