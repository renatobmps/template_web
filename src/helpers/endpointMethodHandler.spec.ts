import { type NextApiRequest, type NextApiResponse } from 'next';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import endpointMethodHandler from './endpointMethodHandler';

interface Res extends NextApiResponse {
  customGetData?: () => string;
}

describe('endpointMethodHandler', () => {
  let req: NextApiRequest;
  let res: Res;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    req = {
      method: 'GET',
    } as NextApiRequest;

    res = {
      status: vi.fn(() => res),
      end: vi.fn(),
      send: vi.fn(),
      json: vi.fn(),
      customGetData: vi.fn(() => '{"message":"Hello, world!"}'),
    } as unknown as NextApiResponse;
  });

  it('should return a function', async () => {
    expect(typeof endpointMethodHandler).toBe('function');
  });

  it('handles a valid request', async () => {
    const methods = {
      GET: async (request: NextApiRequest, response: NextApiResponse) => {
        response.status(200).json({ message: 'Hello, world!' });
      },
    };

    await endpointMethodHandler(req, res, methods);

    expect(res.status).toHaveBeenCalledWith(200);
    if (res.customGetData) {
      expect(res.customGetData()).toEqual('{"message":"Hello, world!"}');
    }
  });
});
