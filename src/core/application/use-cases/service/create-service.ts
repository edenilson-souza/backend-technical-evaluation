import { Service } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class CreateServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(input: Input): Promise<Service> {
    const service = Service.create(input);
    await this.serviceRepository.save(service);
    return service;
  }
}

type Input = {
  id_client: string;
  description: string;
};
