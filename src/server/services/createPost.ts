import type PostRepository from 'src/server/providers/postRepository';
import Post, { type PostProps } from '@serverEntities/post';

interface CreatePostRequest extends PostProps {}

type CreatePostResponse = Post;

export default class CreatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({
    body,
    title,
    user,
  }: Omit<CreatePostRequest, 'id'>): Promise<CreatePostResponse> {
    const post = new Post({
      body,
      title,
      user,
    });

    await this.postRepository.create(post);

    return post;
  }
}
