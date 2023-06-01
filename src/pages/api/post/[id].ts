import type { NextApiRequest, NextApiResponse } from 'next';
import PostDTO from 'src/server/repositories/prisma/postDTO';
import ListOnePost from 'src/server/services/listOnePost';
import { z } from 'zod';

const dto = new PostDTO();

const methods: Record<
  string,
  (req: NextApiRequest, res: NextApiResponse) => Promise<any>
> = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const listOnePost = new ListOnePost(dto);

    const queryData = z.object({
      id: z.string().min(1),
    });
    const { id } = queryData.parse(req.query);

    if (typeof id !== 'string') return res.status(400).end();

    const posts = await listOnePost.execute({ postId: id });
    res.status(200).json({ posts });
    return undefined;
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
