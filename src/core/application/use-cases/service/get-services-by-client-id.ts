import { ServiceStatus } from 'src/core/domain/entities/service';
import { ServiceRepository } from '../../repositories/service-repository';

export class GetServicesByClientIdUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(clientId: string): Promise<Output[]> {
    const services = await this.serviceRepository.getServicesByClientId(
      clientId,
    );

    const output = services.map<Output>((service) => ({
      id: service.id,
      id_client: service.id_client,
      id_architect: service.id_architect,
      description: service.description,
      status: service.status,
    }));

    return output;
  }
}

type Output = {
  id: string;
  id_client: string;
  id_architect: string | null;
  description: string;
  status: ServiceStatus;
};
