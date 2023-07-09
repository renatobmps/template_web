import type Post from '@serverEntities/post';

type PostWithLink = Omit<Post, 'body' | 'user' | 'link'> & {
  link: string;
};

export default interface PostRepository {
  create(post: Post): Promise<void>;
  findDuplicatedTitle(title: string): Promise<Post.PostProps | null>;
  readAll(): Promise<PostWithLink[]>;
  readOne(id: string): Promise<Post.PostProps | null>;
}
