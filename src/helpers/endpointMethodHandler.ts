import { type NextApiRequest, type NextApiResponse } from 'next';
import type GeneralError from '@errors/GeneralError';

type Methods = Record<
  string,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
>;

export default async function endpointMethodHandler(
  request: NextApiRequest,
  response: NextApiResponse,
  methods: Methods,
): Promise<void> {
  const { method } = request;

  if (typeof methods[method as string] === 'function') {
    try {
      await methods[method as string](request, response);
    } catch (e) {
      const error = e as GeneralError;
      const errorMessage =
        error?.message && error?.message.length
          ? error.message
          : 'Unknown error';
      response.status(error?.message ? 400 : 500).json({
        message: errorMessage,
      });
      throw new Error(errorMessage);
    }
  } else {
    response.setHeader('Allow', Object.keys(methods));
    response.status(405).end();
  }
}
