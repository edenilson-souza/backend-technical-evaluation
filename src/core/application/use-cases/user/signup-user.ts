import { UserRepository } from 'src/core/application/repositories/user-repository';
import { User } from 'src/core/domain/entities/user';

export class SignupUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const user = User.create(input);
    await this.userRepository.save(user);
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
};
