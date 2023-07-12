import Router from 'next/router';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import type GeneralError from '@errors/GeneralError';
import Api from '@helpers/api';

interface FormDataProps {
  login: string;
  password: string;
  loginMethod: 'username' | 'email';
}

export default function Register(): JSX.Element {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  useEffect(() => {
    if (cookies.token) void Router.push('/');
  }, [cookies]);

  const [formData, setFormData] = useState<FormDataProps>({
    login: '',
    password: '',
    loginMethod: 'username',
  });

  const handleInput: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const { id, value } = e.currentTarget;

    if (id === 'login') {
      const isEmail = value.includes('@');
      setFormData({
        ...formData,
        [id]: value,
        loginMethod: isEmail ? 'email' : 'username',
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const formSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (
    event,
  ) => {
    try {
      event.preventDefault();
      const api = new Api();

      const { token }: { token: string } = await api.post({
        url: '/api/login',
        data: formData,
        clientErrorMessage: 'Not found! :(',
      });

      setCookie('token', token);

      setFormData({
        login: '',
        password: '',
        loginMethod: 'email',
      });

      await Router.push('/');
    } catch (e) {
      removeCookie('token');
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
          await Router.push('/user/register');
        }}
      >
        Have no login? Create here
      </button>
      <label htmlFor="login">
        <span>Login</span>
        <input
          autoFocus
          type="text"
          id="login"
          value={formData.login}
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
      <button type="submit">Login</button>
    </form>
  );
}
