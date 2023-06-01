import { type PostProps } from '../entities/post';

export default interface PostRepository {
  create(post: PostProps): Promise<void>;
  findDuplicatedTitle(title: string): Promise<PostProps | null>;
  readAll(): Promise<Array<{ id: string; title: string; link: string }>>;
  readOne(id: string): Promise<PostProps | null>;
}
