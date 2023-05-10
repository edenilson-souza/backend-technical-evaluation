import { Service } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class GetServicesByArchitectIdUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(archiveId: string): Promise<Service[]> {
    return await this.serviceRepository.getServicesByArchiveId(archiveId);
  }
}
