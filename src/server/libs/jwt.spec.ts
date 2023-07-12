import { describe } from 'vitest';
import { decodeJwt, decodeProtectedHeader } from 'jose';
import { decodeValues, encodeValues } from './jwt';

describe('jwt', () => {
  describe('encodeValues', () => {
    it('should to encode JWT with default values', async () => {
      const values = { foo: 'bar' };
      const jwt = await encodeValues(values);

      const decoded = decodeJwt(jwt);
      expect(decoded.foo).toEqual(values.foo);
      expect(decoded.iss).toEqual('urn:example:issuer');
      expect(decoded.aud).toEqual('urn:example:audience');

      const protectedHeader = decodeProtectedHeader(jwt);
      expect(protectedHeader.alg).toEqual('HS256');
    });

    it('should to encode JWT with custom expiration time', async () => {
      const values = { foo: 'bar' };
      const expirationTime = '5h';
      const jwt = await encodeValues(values, { expirationTime });

      const decoded = decodeJwt(jwt);
      expect(decoded.foo).toEqual(values.foo);
      expect(decoded.iss).toEqual('urn:example:issuer');
      expect(decoded.aud).toEqual('urn:example:audience');

      const protectedHeader = decodeProtectedHeader(jwt);
      expect(protectedHeader.alg).toEqual('HS256');
    });

    it('should enconde with config undefined', async () => {
      const values = { foo: 'bar' };
      const jwt = await encodeValues(values, undefined);
      const decoded = decodeJwt(jwt);
      expect(decoded.foo).toEqual(values.foo);
      expect(decoded.iss).toEqual('urn:example:issuer');
      expect(decoded.aud).toEqual('urn:example:audience');

      const protectedHeader = decodeProtectedHeader(jwt);
      expect(protectedHeader.alg).toEqual('HS256');
    });
  });
  describe('decodeValues', () => {
    it('should to return a valid payload', () => {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2ODgyNzEwMzUsImlzcyI6InVybjpleGFtcGxlOmlzc3VlciIsImF1ZCI6InVybjpleGFtcGxlOmF1ZGllbmNlIiwiZXhwIjoxNjg4Mjc4MjM1fQ.0i_lXUWMckyOoCtps4BXTt1kL9yCBgmjlPMHlo1S_no';
      const payload = decodeValues(token);
      expect(payload.foo).toEqual('bar');
    });

    it('should to throw an error for a invalid JWT', () => {
      expect(() => decodeValues('')).toThrowError('Invalid JWT');
      expect(() => decodeValues('test_invalid_token')).toThrowError('Invalid JWT');
    });

    it('should to throw an error for no string JWT', () => {
      expect(() => decodeValues(123)).toThrowError('JWTs must use Compact JWS serialization, JWT must be a string');
    });
  });
  describe('integration', async () => {
    const dataToDecode = {
      name: 'John Doe',
      age: 34,
      email: 'jdoe@example.com',
    };

    it('should encode the data and decode it', async () => {
      const token = await encodeValues({ dataToDecode });
      const payload = decodeJwt(token);
      expect(payload.dataToDecode).toEqual(dataToDecode);
    });
  });
});
