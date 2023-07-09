// eslint-disable-next-line prettier/prettier, sort-imports
import { type JWTPayload, SignJWT, decodeJwt } from 'jose';
import type GeneralError from '@errors/GeneralError';

interface encodeValuesConfig {
  expirationTime?: string;
}

export async function encodeValues<T extends JWTPayload>(
  values: T,
  config?: encodeValuesConfig,
): Promise<string> {
  if (!process.env.JWT_SECRET_KEY) throw new Error('Is missing a secret key');
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  const jwt = await new SignJWT(values)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime(config?.expirationTime ?? '2h')
    .sign(secret);

  return jwt;
}

export function decodeValues(token: string): JWTPayload {
  try {
    const payload = decodeJwt(token);

    return payload;
  } catch (e) {
    const error = e as GeneralError;
    throw new Error(error.message);
  }
}
