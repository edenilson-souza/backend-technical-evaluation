import { Service } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class GetServiceByIdUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<Service> {
    const service = await this.serviceRepository.getServiceById(id);

    if (!service) throw new Error('Service not found');

    return service;
  }
}
