import { randomUUID } from 'crypto';

export interface PostProps {
  id: string;
  title: string;
  body: string;
  user: string;
}

export default class Post {
  private readonly props: PostProps;

  private validateBody(body: string): true {
    if (body.length < 5) throw new Error('Body must be at least 5 characters');

    return true;
  }

  set body(body: string) {
    this.validateBody(body);
    this.props.body = body;
  }

  get body(): string {
    return this.props.body;
  }

  set id(id: string) {
    throw new Error(
      `ID cannot be changed. Ignoring attempt to set ${id} to ID`,
    );
  }

  get id(): string {
    return this.props.id;
  }

  private validateTitle(title: string): true {
    if (title.length < 1) throw new Error('Title must be fielded');

    return true;
  }

  set title(title: string) {
    this.validateTitle(title);
    this.props.title = title;
  }

  get title(): string {
    return this.props.title;
  }

  private validateUser(user: string): true {
    if (user.length < 1) throw new Error('Invalid username');

    return true;
  }

  set user(user: string) {
    this.validateUser(user);
    this.props.user = user;
  }

  get user(): string {
    return this.props.user;
  }

  constructor(props: Omit<PostProps, 'id'>, id?: string) {
    const { body, title, user } = props;
    this.validateBody(body);
    this.validateTitle(title);
    this.validateUser(user);

    this.props = {
      ...props,
      id: id ?? randomUUID(),
    };
  }
}
