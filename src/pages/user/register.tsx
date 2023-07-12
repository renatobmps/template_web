import Router from 'next/router';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import type GeneralError from '@errors/GeneralError';
import Api from '@helpers/api';

interface FormDataProps {
  email: string;
  username: string;
  password: string;
}

export default function Register(): JSX.Element {
  const [cookies] = useCookies(['token']);
  useEffect(() => {
    if (cookies.token) void Router.push('/');
  }, [cookies]);

  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: '',
    username: '',
  });

  const handleInput: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const { id, value } = e.currentTarget;
    setFormData({ ...formData, [id]: value });
  };

  const formSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (
    event,
  ) => {
    try {
      event.preventDefault();
      const api = new Api();
      await api.post({
        url: '/api/user',
        data: formData,
        clientErrorMessage: 'Not created! :(',
      });

      setFormData({
        email: '',
        password: '',
        username: '',
      });

      await Router.push('/user/login');
    } catch (e) {
      const error = e as GeneralError;
      window.alert(error.message || 'Unexpected error');
    }
  };

  return (
    <form
      onSubmit={formSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        margin: 'auto',
      }}
    >
      <button
        type="button"
        onClick={async () => {
          await Router.push('/user/login');
        }}
      >
        Try login
      </button>
      <label htmlFor="email">
        <span>E-mail</span>
        <input
          autoFocus
          type="email"
          id="email"
          value={formData.email}
          onInput={handleInput}
        />
      </label>
      <label htmlFor="username">
        <span>Username</span>
        <input
          type="text"
          id="username"
          value={formData.username}
          onInput={handleInput}
        />
      </label>
      <label htmlFor="password">
        <span>Password</span>
        <input
          type="password"
          id="password"
          value={formData.password}
          onInput={handleInput}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}
