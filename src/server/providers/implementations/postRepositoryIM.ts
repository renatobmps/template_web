import { type Post } from '@serverEntities/post';
import type PostRepository from '@serverProviders/postRepository';

type PostWithLink = Omit<Post, 'body' | 'user' | 'link'> & {
  link: string;
};

export default class PostRepositoryIM implements PostRepository {
  private readonly posts: Post[] = [];

  public async create(post: Post): Promise<void> {
    this.posts.push(post);
  }

  public async findDuplicatedTitle(title: string): Promise<Post | null> {
    const duplicated = this.posts.find((post) => post.title === title);

    return duplicated ?? null;
  }

  public async readAll(): Promise<PostWithLink[]> {
    return this.posts.map((post: Post) => ({
      body: undefined,
      user: undefined,
      link: `${process.env.HOST as string}/api/post/${post.id}`,
      id: post.id,
      title: post.title,
    }));
  }

  public async readOne(id: string): Promise<Post | null> {
    const onePost = this.posts.find((post) => post.id === id);

    return onePost ?? null;
  }
}
