import { UserRepository } from 'src/core/application/repositories/user-repository';

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email);

    if (!user) throw new Error('Authentication failed');
    if (input.password !== user.password.value)
      throw new Error('Authentication failed');

    return {
      name: user.name.value,
      token: 'jwt-token',
    };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  name: string;
  token: string;
};