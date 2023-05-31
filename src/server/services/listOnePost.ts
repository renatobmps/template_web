import { type PostProps } from '../entities/post';
import type PostRepository from '../repositories/postRepository';

interface ListOnePostRequest {
  postId: string;
}

type ListOnePostResponse = PostProps;

export default class ListOnePost {
  constructor(private readonly postRepository: PostRepository) {}

  // eslint-disable-next-line class-methods-use-this
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
