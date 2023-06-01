import { type PostProps } from '../../entities/post';
import type PostRepository from '../postRepository';

export default class InMemoryPostRepository implements PostRepository {
  private readonly posts: PostProps[] = [
    {
      body: 'Some body',
      id: 'some-id',
      title: 'Some title',
      user: 'some-username',
    },
    {
      body: 'Another body',
      id: 'another-id',
      title: 'Another title',
      user: 'same-username',
    },
  ];

  async create(post: PostProps): Promise<void> {
    this.posts.push(post);
  }

  async findDuplicatedTitle(title: string): Promise<PostProps | null> {
    const duplicated = this.posts.find((post) => post.title === title);

    return duplicated ?? null;
  }

  async readAll(): Promise<Array<{ id: string; title: string; link: string }>> {
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

  async readOne(id: string): Promise<PostProps | null> {
    const onePost = this.posts.find((post) => post.id === id);

    return onePost ?? null;
  }
}
