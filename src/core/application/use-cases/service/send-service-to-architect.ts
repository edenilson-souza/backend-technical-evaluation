import { ServiceRepository } from '../../repositories/service-repository';

export class SendServiceToArchitectUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(input: Input): Promise<void> {
    const service = await this.serviceRepository.getServiceById(input.id);

    if (!service) throw new Error('Service not found');
    service.id_architect = input.id_architect;

    await this.serviceRepository.update(service);
  }
}

type Input = {
  id: string;
  id_architect: string;
};
