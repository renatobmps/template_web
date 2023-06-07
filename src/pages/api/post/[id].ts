import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import PostDTO from '@serverProviders/prisma/postDTO';
import ListOnePost from '@serverUseCases/listOnePost';

const dto = new PostDTO();

const methods: Record<
  string,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {
  GET: async (req, res) => {
    const listOnePost = new ListOnePost(dto);

    const queryData = z.object({
      id: z.string().min(1),
    });
    const { id } = queryData.parse(req.query);

    if (typeof id !== 'string') {
      res.status(400).end();
    } else {
      const posts = await listOnePost.execute({ postId: id });
      res.status(200).json({ posts });
    }
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method != null && req.method in methods) {
    try {
      await methods[req.method](req, res);
    } catch (error: any) {
      res.status(error?.message ? 400 : 500).json({
        message: error?.message ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  res.status(405).end();
}
