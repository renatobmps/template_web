import type PostRepository from 'src/server/providers/postRepository';
import Post from '@serverEntities/post';

interface CreatePostRequest {
  title: string;
  body: string;
  user: string;
}

interface CreatePostResponse {
  id: string;
  title: string;
  body: string;
  user: string;
}

export default class CreatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({
    body,
    title,
    user,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const post = new Post({
      body,
      title,
      user,
    });

    await this.postRepository.create(post);

    return post;
  }
}
