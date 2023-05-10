import { ServiceRepository } from 'src/core/application/repositories/service-repository';
import { Service } from 'src/core/domain/entities/service';

export class ServiceRepositoryInMemory implements ServiceRepository {
  services: Service[];

  constructor() {
    this.services = [];
  }

  async save(service: Service): Promise<void> {
    this.services.push(service);
  }
  async update(service: Service): Promise<void> {
    const index = this.services.findIndex((item) => item.id === service.id);
    this.services[index] = service;
  }
  async getServiceById(id: string): Promise<Service> {
    return this.services.find((service) => service.id === id);
  }
  async getServicesByClientId(clientId: string): Promise<Service[]> {
    return this.services.filter((service) => service.id_client === clientId);
  }
  async getServicesByArchiveId(archiveId: string): Promise<Service[]> {
    return this.services.filter(
      (service) => service.id_architect === archiveId,
    );
  }
  async listAllServices(): Promise<Service[]> {
    return this.services;
  }
}
