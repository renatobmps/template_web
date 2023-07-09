import Post from '@serverEntities/post';
import type PostRepository from '@serverRepositories/postRepository';

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
