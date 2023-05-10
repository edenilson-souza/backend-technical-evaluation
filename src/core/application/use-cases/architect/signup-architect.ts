import { ArchitectRepository } from 'src/core/application/repositories/architect-repository';
import { Architect } from 'src/core/domain/entities/architect';

export class SignupArchitectUseCase {
  constructor(private architectRepository: ArchitectRepository) {}

  async execute(input: Input): Promise<void> {
    let architect = await this.architectRepository.getByEmail(input.email);

    if (architect) throw new Error('Email is already registered.');

    architect = Architect.create(input);
    await this.architectRepository.save(architect);
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
};
