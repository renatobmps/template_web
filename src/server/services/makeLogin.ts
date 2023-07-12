import User from '@serverEntities/user';
import type UserRepository from '@serverRepositories/userRepository';
import { encodeValues } from '../libs/jwt';

interface MakeLoginRequest {
  login: string;
  password: string;
  loginMethod: 'username' | 'email';
}

interface MakeLoginResponse {
  token: string;
}

class MakeLogin {
  public async execute({
    login,
    password,
    loginMethod,
  }: MakeLoginRequest): Promise<MakeLoginResponse> {
    const promiseLoginData =
      loginMethod === 'email'
        ? this.repository.findByEmail(login)
        : this.repository.findByUsername(login);

    const userFromDatabase = await promiseLoginData;
    if (!userFromDatabase) throw new Error(`User ${login} not found`);

    const user = new User(
      {
        email: userFromDatabase.email,
        username: userFromDatabase.username,
        password: userFromDatabase.password,
      },
      userFromDatabase.id,
      false,
    );
    const isValidPassword = await user.isMathPassword(password);
    if (!isValidPassword) throw new Error('Invalid password');

    const token = await encodeValues({
      email: userFromDatabase.email,
    });

    return {
      token,
    };
  }

  constructor(private readonly repository: UserRepository) {}
}

export default MakeLogin;
