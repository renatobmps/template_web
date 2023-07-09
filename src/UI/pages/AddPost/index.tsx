import Link from 'next/link';
import Router from 'next/router';
import { type CSSProperties, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import type GeneralError from '@errors/GeneralError';
import Api from '@helpers/api';

interface ApiResponse {
  newPost: {
    props: {
      body: string;
      id: string;
      title: string;
      user: string;
    };
  };
}

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
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (!cookies.token) void Router.push('/');
  }, [cookies]);

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
      const { newPost }: ApiResponse = await api.post({
        url: '/api/post',
        data,
        clientErrorMessage: 'Problem with server! :(',
      });

      window.alert('Created :)');

      await Router.push(`/post/${newPost.props.id}`);
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
      <Link href="/">Ver postagens</Link>
      <article>
        <h2>New post</h2>
        <form style={formStyle} onSubmit={onSubmit}>
          <label style={labelStyle} htmlFor="title">
            <span>Title</span>
            <input name="title" id="title" autoFocus />
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
