import { type NextApiRequest, type NextApiResponse } from 'next';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import endpointMethodHandler from './endpointMethodHandler';

describe('endpointMethodHandler', () => {
  interface Res extends NextApiResponse {
    customGetData?: () => string;
  }
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
      setHeader: vi.fn(),
    } as unknown as NextApiResponse;
  });

  it('should be defined', () => {
    expect(endpointMethodHandler).toBeDefined();
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

  it('should to throw an error with message when run a problematic method', () => {
    const methods = {
      GET: async (request: NextApiRequest, response: NextApiResponse) => {
        throw new Error('Error');
      },
    };

    void expect(endpointMethodHandler(req, res, methods)).rejects.toThrow('Error');
  });

  it('should to throw an error with unknown message when run a problematic method', () => {
    const methods = {
      GET: async (request: NextApiRequest, response: NextApiResponse) => {
        throw new Error();
      },
    };

    void expect(endpointMethodHandler(req, res, methods)).rejects.toThrow('Unknown error');
  });

  it('should to return a 405 status when have no method', async () => {
    const methods = {};

    await endpointMethodHandler(req, res, methods);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', Object.keys(methods));
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalled();
  });
});
