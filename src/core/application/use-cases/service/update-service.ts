import { Service, ServiceStatus } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class UpdateServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(input: Input): Promise<Output> {
    const service = await this.serviceRepository.getServiceById(input.id);

    if (!service) throw new Error('Service not found');
    if (service.id_client !== input.id_client)
      throw new Error('Unauthorized action');

    const updatedService = new Service(
      service.id_client,
      input.description,
      service.id,
      input.id_architect,
      service.status
    );

    await this.serviceRepository.update(updatedService);

    return {
      id: updatedService.id,
      id_client: updatedService.id_client,
      id_architect: updatedService.id_architect,
      description: updatedService.description,
      status: updatedService.status,
    };
  }
}

type Output = {
  id: string;
  id_client: string;
  id_architect: string;
  description: string;
  status: ServiceStatus;
};

type Input = {
  id: string;
  id_client: string;
  id_architect: string | null;
  description: string;
};
