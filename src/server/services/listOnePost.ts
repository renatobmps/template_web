import type PostRepository from '@serverRepositories/postRepository';

interface ListOnePostRequest {
  postId: string;
}

export interface ListOnePostResponse {
  title: string;
  body: string;
  user: string;
}

export default class ListOnePost {
  constructor(private readonly postRepository: PostRepository) {}

  private validateRules(id: string): void {
    if (id.length < 1) throw new Error('Id is required');
  }

  async execute({
    postId,
  }: ListOnePostRequest): Promise<ListOnePostResponse | null> {
    this.validateRules(postId);

    const response = await this.postRepository.readOne(postId);

    return response;
  }
}
