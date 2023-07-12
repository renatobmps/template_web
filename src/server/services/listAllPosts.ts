import type PostRepository from '@serverRepositories/postRepository';

export type ListAllPostsResponse = Array<{
  id: string;
  title: string;
  link: string;
}>;

export default class ListAllPosts {
  constructor(private readonly postsRepository: PostRepository) {}

  async execute(): Promise<ListAllPostsResponse> {
    const posts = await this.postsRepository.readAll();
    return posts;
  }
}
