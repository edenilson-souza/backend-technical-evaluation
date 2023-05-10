import { ArchitectRepository } from 'src/core/application/repositories/architect-repository';

export class LoginArchitectUseCase {
  constructor(private architectRepository: ArchitectRepository) {}

  async execute(input: Input): Promise<Output> {
    const architect = await this.architectRepository.getByEmail(
      input.email,
    );

    if (!architect) throw new Error('Authentication failed');
    if (input.password !== architect.password.value)
      throw new Error('Authentication failed');

    return {
      name: architect.name.value,
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
