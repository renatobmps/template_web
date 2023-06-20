import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import stringFormatToSlug from '@helpers/stringFormatToSlug';
import validEmailFormat from '@helpers/validEmailFormat';

export interface UserProps {
  id: string;
  username: string;
  email: string;
  password: string;
}

class User {
  private readonly props: UserProps;

  private validateId(id: string): true {
    throw new Error('You can not change the ID of a User');
  }

  set id(id: string) {
    this.validateId(id);
    this.props.id = id;
  }

  get id(): string {
    return this.props.id;
  }

  private validateUsername(username: string): true {
    if (username.length < 4) {
      throw new Error('A username should have at least 4 characters');
    }
    if (username.length > 16) {
      throw new Error('A username should have at most 16 characters');
    }
    if (username !== stringFormatToSlug(username)) {
      throw new Error('A username should be a slug');
    }

    return true;
  }

  set username(username: string) {
    this.validateUsername(username);
    this.props.username = username;
  }

  get username(): string {
    return this.props.username;
  }

  private validateEmail(email: string): true {
    if (!validEmailFormat(email)) {
      throw new Error('A email should be a valid email format');
    }

    return true;
  }

  set email(email: string) {
    this.validateEmail(email);
    this.props.email = email;
  }

  get email(): string {
    return this.props.email;
  }

  private validatePassword(password: string): true {
    if (password.length < 8) {
      throw new Error('A password should have at least 8 characters');
    }
    if (!/[a-z]/g.test(password)) {
      throw new Error('A password should have at least one lowercase letter');
    }
    if (!/[A-Z]/g.test(password)) {
      throw new Error('A password should have at least one uppercase letter');
    }
    if (!/[0-9]/g.test(password)) {
      throw new Error('A password should have at least one number');
    }
    if (!/[*@!#%&()^~{}]+/g.test(password)) {
      throw new Error('A password should have at least one special character');
    }

    return true;
  }

  set password(password: string) {
    this.validatePassword(password);
    this.props.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  get password(): string {
    return this.props.password;
  }

  constructor(props: Omit<UserProps, 'id'>, id?: string) {
    this.validateUsername(props.username);
    this.validateEmail(props.email);
    this.validatePassword(props.password);

    this.props = {
      ...props,
      password: bcrypt.hashSync(props.password, bcrypt.genSaltSync(10)),
      id: id ?? randomUUID(),
    };
  }
}

export default User;
