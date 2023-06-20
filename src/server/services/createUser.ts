import type UserRepository from '@serverProviders/userRepository';
import User from '@serverEntities/user';

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  id: string;
  username: string;
  email: string;
}

class CreateUser {
  async execute({
    email,
    password,
    username,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const user = new User({
      email,
      password,
      username,
    });

    if (await this.repository.findDuplicatedEmail(user.email)) {
      throw new Error('email already exists');
    }

    if (await this.repository.findDuplicatedUsername(user.username)) {
      throw new Error('username already exists');
    }

    await this.repository.create(user);

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  constructor(private readonly repository: UserRepository) {}
}

export default CreateUser;
