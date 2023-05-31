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

  async findDuplicatedIDs(id: string): Promise<PostProps | null> {
    const duplicated = this.posts.find((post) => post.id === id);

    return duplicated ?? null;
  }

  async readAll(): Promise<Array<{ id: string; title: string; link: string }>> {
    return this.posts.map((post) => ({
      ...post,
      body: undefined,
      user: undefined,
      link: `http://localhost:3000/api/post/${post.id}`,
    }));
  }

  async readOne(id: string): Promise<PostProps | null> {
    const onePost = this.posts.find((post) => post.id === id);

    return onePost ?? null;
  }
}
