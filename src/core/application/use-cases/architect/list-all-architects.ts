import { ArchitectRepository } from 'src/core/application/repositories/architect-repository';

export class ListAllArchitectsUseCase {
  constructor(private architectRepository: ArchitectRepository) {}

  async execute(): Promise<Output[]> {
    const architects = await this.architectRepository.listAll();

    const output = architects.map<Output>((architect) => ({
      id: architect.id,
      name: architect.name,
      email: architect.email,
      age: architect.age,
      gender: architect.gender,
    }));

    return output;
  }
}

type Output = {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
};
