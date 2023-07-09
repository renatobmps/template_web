import { useCookies } from 'react-cookie';

interface LogOffButtonProps {
  handleLogIn: (newState: boolean) => void;
}

export default function LogOffButton({
  handleLogIn,
}: LogOffButtonProps): JSX.Element {
  const [cookies, , removeCookie] = useCookies(['token']);

  const handleLogOff = (): void => {
    if (cookies.token) removeCookie('token');
    handleLogIn(false);
  };

  return (
    <button type="button" onClick={handleLogOff}>
      Exit
    </button>
  );
}
