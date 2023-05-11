import { ArchitectRepository } from 'src/core/application/repositories/architect-repository';

export class LoginArchitectUseCase {
  constructor(private architectRepository: ArchitectRepository) {}

  async execute(input: Input): Promise<Output> {
    const architect = await this.architectRepository.getByEmail(input.email);

    if (!architect) throw new Error('Authentication failed');
    if (input.password !== architect.password)
      throw new Error('Authentication failed');

    return {
      id: architect.id,
      name: architect.name,
      token: 'jwt-token',
    };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  id: string;
  name: string;
  token: string;
};
