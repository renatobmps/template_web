import Link from 'next/link';
import { type CSSProperties } from 'react';
import type GeneralError from '@errors/GeneralError';

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '500px',
  marginInline: 'auto',
};

const labelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
  width: '100%',
};

export default function AddPost(): JSX.Element {
  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const { currentTarget } = event;
    currentTarget.querySelector('button')?.setAttribute('disabled', 'true');
    try {
      const response = await fetch('/api/post', {
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

      if (response.status !== 201) {
        const stringifyText = await response.text();
        const errorMessage = JSON.parse(stringifyText).message;
        throw new Error(errorMessage);
      }

      window.alert('Created :)');
    } catch (e) {
      const error = e as GeneralError;
      window.alert(error.message || 'Unexpected error');
    } finally {
      currentTarget.querySelector('button')?.removeAttribute('disabled');
      currentTarget.reset();
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
      <Link href="/post">Ver postagens</Link>
      <article>
        <h2>New post</h2>
        <form style={formStyle} onSubmit={onSubmit}>
          <label style={labelStyle} htmlFor="title">
            <span>Title</span>
            <input name="title" id="title" />
          </label>
          <label style={labelStyle} htmlFor="body">
            <span>Post</span>
            <textarea name="body" id="body" cols={30} rows={10} />
          </label>
          <label style={labelStyle} htmlFor="user">
            <span>Username</span>
            <input name="user" id="user" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </article>
    </div>
  );
}