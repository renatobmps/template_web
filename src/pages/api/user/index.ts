import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import CreateUser from '@serverUseCases/createUser';
import endpointMethodHandler from '@helpers/endpointMethodHandler';
import PostDTO from '@serverRepositories/implementations/userRepositoryIM';

const dto = new PostDTO();

const methods: Record<
  string,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {
  POST: async (req, res) => {
    const createUser = new CreateUser(dto);

    const bodyData = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      username: z.string().min(4),
    });
    const { email, password, username } = bodyData.parse(req.body);

    const newUser = await createUser.execute({
      email,
      password,
      username,
    });

    res.status(201).json({ newUser });
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await endpointMethodHandler(req, res, methods);
}
