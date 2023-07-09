import type GeneralError from '@errors/GeneralError';

interface Post<T> {
  url: string;
  data: T;
  expectStatus?: number;
  clientErrorMessage?: string;
}

class Api {
  async post<T>({
    data,
    url,
    expectStatus = 201,
    clientErrorMessage,
  }: Post<T>): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
        },
        body: JSON.stringify(data),
        mode: 'cors',
        credentials: 'include',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        cache: 'no-cache',
        keepalive: true,
        window: null,
      });

      if (response.status !== expectStatus) {
        throw new Error(
          `Response status ${response.status} unexpected ${expectStatus}`,
        );
      }

      const formattedData = await response.json();

      return formattedData;
    } catch (e) {
      const error = e as GeneralError;
      const errorMessage =
        clientErrorMessage ??
        (error?.message && error?.message.length
          ? error.message
          : 'Unknown error');

      throw new Error(errorMessage);
    }
  }
}

export default Api;
