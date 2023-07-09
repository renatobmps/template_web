import Link from 'next/link';

export default function LogInButtons(): JSX.Element {
  return (
    <>
      <Link href="/user/login">Try login</Link>
      <br />
      <Link href="/user/register">Create register</Link>
    </>
  );
}
