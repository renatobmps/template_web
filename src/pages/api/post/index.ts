import type { NextApiRequest, NextApiResponse } from 'next';
import PostDTO from 'src/server/repositories/prisma/postDTO';
import CreatePost from 'src/server/services/createPost';
import ListAllPosts from 'src/server/services/listAllPosts';

const dto = new PostDTO();

const methods: Record<
  string,
  (req: NextApiRequest, res: NextApiResponse) => Promise<any>
> = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    const createPost = new CreatePost(dto);

    const { body, title, user } = req.body;

    const newPost = createPost.execute({
      body,
      title,
      user,
    });

    res.status(201).json({ newPost });
  },
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const listAllPosts = new ListAllPosts(dto);

    const posts = await listAllPosts.execute();
    res.status(200).json({ posts });
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse<any> | undefined> {
  if (req.method != null && req.method in methods) {
    try {
      return await methods[req.method](req, res);
    } catch (error) {
      return res.status(500).end();
    }
  }

  return res.status(405).end();
}
