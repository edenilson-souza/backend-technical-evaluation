import { Service, ServiceStatus } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class CreateServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(input: Input): Promise<Output> {
    const service = Service.create(input);
    await this.serviceRepository.save(service);
    return {
      id: service.id,
      id_client: service.id_client,
      id_architect: service.id_architect,
      description: service.description,
      status: service.status,
    };
  }
}

type Input = {
  id_client: string;
  description: string;
};

type Output = {
  id: string;
  id_client: string;
  id_architect: string | null;
  description: string;
  status: ServiceStatus;
};
