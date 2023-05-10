import { ArchitectRepository } from 'src/core/application/repositories/architect-repository';
import { Architect } from 'src/core/domain/entities/architect';

export class ListAllArchitectsUseCase {
  constructor(private architectRepository: ArchitectRepository) {}

  async execute(): Promise<Architect[]> {
    return await this.architectRepository.listAll();
  }
}
