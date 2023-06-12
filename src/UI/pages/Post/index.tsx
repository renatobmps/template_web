export interface PostPageProps {
  data: {
    title: string;
    body: string;
    user: string;
  };
}

export default function Post({ data }: PostPageProps): JSX.Element {
  return (
    <article>
      <header>
        <h1>{data.title}</h1>
      </header>
      <main>{data.body}</main>
      <footer>
        <p>Posted by: {data.user}</p>
      </footer>
    </article>
  );
}
