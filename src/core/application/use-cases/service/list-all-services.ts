import { Service } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class ListAllServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(): Promise<Service[]> {
    return await this.serviceRepository.listAllServices();
  }
}
