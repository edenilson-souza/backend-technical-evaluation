import { ServiceStatus } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class ChangeStatusServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(input: Input): Promise<Output> {
    const service = await this.serviceRepository.getServiceById(input.id);

    if (!service) throw new Error('Service not found');
    if (
      input.status !== 'accepted' &&
      input.status !== 'available' &&
      input.status !== 'refused'
    ) {
      throw new Error('Invalid service status');
    }

    service.changeStatus(input.status);

    if (input.status === 'refused') service.id_architect = null;

    await this.serviceRepository.update(service);

    return {
      id: service.id,
      id_architect: service.id_architect,
      id_client: service.id,
      description: service.description,
      status: service.status,
    };
  }
}

type Input = {
  id: string;
  status: ServiceStatus;
};

type Output = {
  id: string;
  id_client: string;
  id_architect: string | null;
  description: string;
  status: ServiceStatus;
};
