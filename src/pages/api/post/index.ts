import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import CreatePost from '@serverUseCases/createPost';
import endpointMethodHandler from '@helpers/endpointMethodHandler';
import PostDTO from '@serverRepositories/implementations/postRepositoryPrisma';

const dto = new PostDTO();

const methods: Record<
  string,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {
  POST: async (req, res) => {
    const createPost = new CreatePost(dto);

    const bodyData = z.object({
      body: z.string().min(10),
      title: z.string().min(5),
      user: z.string().min(3),
    });
    const { body, title, user } = bodyData.parse(req.body);

    const newPost = await createPost.execute({
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
  await endpointMethodHandler(req, res, methods);
}
