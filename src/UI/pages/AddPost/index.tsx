import Link from 'next/link';
import { type CSSProperties } from 'react';
import type GeneralError from '@errors/GeneralError';
import Api from '@helpers/api';

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
      const api = new Api();
      await api.post({
        url: '/api/post',
        data,
        clientErrorMessage: 'Problem with server! :(',
      });

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
      <Link href="/user/login">Try login</Link>
      <br />
      <Link href="/user/register">Create register</Link>
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
