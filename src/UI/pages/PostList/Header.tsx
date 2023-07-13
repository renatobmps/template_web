import Link from 'next/link';
import { type CSSProperties } from 'react';
import LogInButtons from './LogInButtons';
import LogOffButton from './LogOffButton';

interface HeaderProps {
  isLogged: boolean | null;
  setLogin: (newState: boolean) => void;
}

const newPostButton: CSSProperties = {
  background: 'blue',
  bottom: '1rem',
  borderRadius: '0.5rem',
  color: 'white',
  padding: '1rem 2rem',
  position: 'fixed',
  right: '1rem',
  textDecoration: 'none',
};

export default function Header({
  isLogged,
  setLogin,
}: HeaderProps): JSX.Element {
  if (isLogged === true) {
    return (
      <>
        <LogOffButton handleLogIn={setLogin} />
        <Link href="/post/new" style={newPostButton}>
          Nova postagem
        </Link>
      </>
    );
  }
  if (isLogged === false) return <LogInButtons />;

  return <div />;
}
