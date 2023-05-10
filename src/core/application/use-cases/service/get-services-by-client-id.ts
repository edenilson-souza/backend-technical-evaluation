import { Service } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class GetServicesByClientIdUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(clientId: string): Promise<Service[]> {
    return await this.serviceRepository.getServicesByClientId(clientId);
  }
}
