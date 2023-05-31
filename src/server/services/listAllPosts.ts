import type PostRepository from '../repositories/postRepository';

type ListAllPostsResponse = Array<{ id: string; title: string }>;

export default class ListAllPosts {
  constructor(private readonly postsRepository: PostRepository) {}

  async execute(): Promise<ListAllPostsResponse> {
    const posts = await this.postsRepository.readAll();
    return posts;
  }
}
