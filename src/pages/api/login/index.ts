import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import MakeLogin from '@serverUseCases/makeLogin';
import endpointMethodHandler from '@helpers/endpointMethodHandler';
import PostDTO from '@serverRepositories/implementations/userRepositoryPrisma';

const dto = new PostDTO();

const methods: Record<
  string,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {
  POST: async (req, res) => {
    const makeLogin = new MakeLogin(dto);

    const bodyData = z.object({
      login: z.string().min(4).or(z.string().email()),
      password: z.string().min(8),
      loginMethod: z.literal('username').or(z.literal('email')),
    });
    const { login, loginMethod, password } = bodyData.parse(req.body);

    const { token } = await makeLogin.execute({
      login,
      password,
      loginMethod,
    });

    res.status(201).json({ token });
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await endpointMethodHandler(req, res, methods);
}
