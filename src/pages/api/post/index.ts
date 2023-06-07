import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import PostDTO from '@serverProviders/implementations/postRepositoryPrisma';
import CreatePost from '@serverUseCases/createPost';
import ListAllPosts from '@serverUseCases/listAllPosts';

const dto = new PostDTO();

const methods: Record<
  string,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {
  GET: async (req, res) => {
    const listAllPosts = new ListAllPosts(dto);

    const posts = await listAllPosts.execute();
    res.status(200).json({ posts });
  },
  POST: async (req, res) => {
    const createPost = new CreatePost(dto);

    const bodyData = z.object({
      body: z.string().min(10),
      title: z.string().min(5),
      user: z.string().min(3),
    });
    const { body, title, user } = bodyData.parse(req.body);

    const newPost = createPost.execute({
      body,
      title,
      user,
    });

    res.status(201).json({ newPost });
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
