import ListAllPosts from '@serverUseCases/listAllPosts';
import PostList, { type PostListProps } from '@UIPages/PostList';
import PostDTO from '@serverRepositories/implementations/postRepositoryPrisma';

interface PageProps extends PostListProps {}

export async function getStaticProps(): Promise<{ props: PageProps }> {
  const dto = new PostDTO();
  const listAllPosts = new ListAllPosts(dto);
  const posts = await listAllPosts.execute();

  return {
    props: {
      posts,
    },
  };
}

export default function Page({ posts }: PageProps): JSX.Element {
  return <PostList posts={posts} />;
}
