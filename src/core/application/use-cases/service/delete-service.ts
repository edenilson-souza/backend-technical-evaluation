import { ServiceRepository } from '../../repositories/service-repository';

export class DeleteServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}
