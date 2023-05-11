import { ServiceStatus } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class GetServiceByIdUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<Output> {
    const service = await this.serviceRepository.getServiceById(id);

    if (!service) throw new Error('Service not found');

    return {
      id: service.id,
      id_client: service.id_client,
      id_architect: service.id_architect,
      description: service.description,
      status: service.status,
    };
  }
}

type Output = {
  id: string;
  id_client: string;
  id_architect: string | null;
  description: string;
  status: ServiceStatus;
};
