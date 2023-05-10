import { Service, ServiceStatus } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class UpdateServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(input: Input): Promise<Service> {
    const service = await this.serviceRepository.getServiceById(input.id);

    if (!service) throw new Error('Service not found');
    if (service.id_client !== input.id_client)
      throw new Error('Unauthorized action');

    const updatedService = new Service(
      input.id_client,
      input.description,
      service.id,
      input.id_architect,
      input.status,
    );

    await this.serviceRepository.update(updatedService);
    return updatedService;
  }
}

type Input = {
  id: string;
  id_client: string;
  id_architect: string;
  description: string;
  status: ServiceStatus;
};
