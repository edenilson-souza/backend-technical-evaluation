import { ServiceStatus } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class ChangeStatusServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(input: Input): Promise<void> {
    const service = await this.serviceRepository.getServiceById(input.id);

    if (!service) throw new Error('Service not found');

    service.changeStatus(input.status);

    return await this.serviceRepository.update(service);
  }
}

type Input = {
  id: string;
  status: ServiceStatus;
};
