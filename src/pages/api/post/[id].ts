import type { NextApiRequest, NextApiResponse } from 'next';
import endpointMethodHandler from '@helpers/endpointMethodHandler';

const methods: Record<
  string,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await endpointMethodHandler(req, res, methods);
}
