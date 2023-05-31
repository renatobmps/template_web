import { Post, type PostProps } from '../entities/post';
import type PostRepository from '../repositories/postRepository';

interface CreatePostRequest extends PostProps {}

type CreatePostResponse = Post;

export default class CreatePost {
  constructor(private readonly postRepository: PostRepository) {}

  private async validateRules(id: string): Promise<void> {
    const duplicatedPost = await this.postRepository.findDuplicatedIDs(id);
    if (duplicatedPost != null) throw new Error('Post already exists');
  }

  async execute({
    body,
    id,
    title,
    user,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    await this.validateRules(id);

    const post = new Post({
      body,
      id,
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
