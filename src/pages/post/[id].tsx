import { type GetStaticPaths, type GetStaticProps } from 'next';
import ListAllPosts from '@serverUseCases/listAllPosts';
import ListOnePost from '@serverUseCases/listOnePost';
import NotFound from '@UIPages/NotFound';
import Post, { type PostPageProps } from '@UIPages/Post';
import PostDTO from '@serverRepositories/implementations/postRepositoryPrisma';

interface PageProps extends PostPageProps {}

export const getStaticPaths: GetStaticPaths = async () => {
  const dto = new PostDTO();
  const listAllPosts = new ListAllPosts(dto);
  const posts = await listAllPosts.execute();

  const paths = posts.map((post) => `/post/${post.id}`);
  const fallback = 'blocking';

  return {
    paths,
    fallback,
  };
};

export const getStaticProps: GetStaticProps = async (
  context,
): Promise<{ props: PostPageProps }> => {
  if (!context.params?.id) throw new Error('id required');

  const { id } = context.params;
  if (typeof id !== 'string') throw new Error('id must be a string');
  const dto = new PostDTO();
  const listOnePost = new ListOnePost(dto);
  const post = await listOnePost.execute({ postId: id });

  return {
    props: {
      data: {
        body: post?.body ?? '',
        title: post?.title ?? '',
        user: post?.user ?? '',
      },
    },
  };
};

export default function Page({ data }: PageProps): JSX.Element {
  if (!data.body || !data.title || !data.user) {
    return <NotFound />;
  }
  return <Post data={data} />;
}
