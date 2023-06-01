import { Post, type PostProps } from '../entities/post';
import type PostRepository from '../repositories/postRepository';

interface CreatePostRequest extends PostProps {}

type CreatePostResponse = Post;

export default class CreatePost {
  constructor(private readonly postRepository: PostRepository) {}

  private async validateRules(title: string): Promise<void> {
    const duplicatedPost = await this.postRepository.findDuplicatedTitle(title);
    if (duplicatedPost != null) throw new Error('Post already exists');
  }

  async execute({
    body,
    title,
    user,
  }: Omit<CreatePostRequest, 'id'>): Promise<CreatePostResponse> {
    await this.validateRules(title);

    const post = new Post({
      body,
      title,
      user,
    });

    await this.postRepository.create({
      body: post.body,
      id: post.id,
      title: post.title,
      user: post.user,
    });

    return post;
  }
}
