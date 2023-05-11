import { Service } from 'src/core/domain/entities/service';

export interface ServiceRepository {
  save(service: Service): Promise<void>;
  update(service: Service): Promise<void>;
  delete(id: string): Promise<void>;
  getServiceById(id: string): Promise<Service>;
  getServicesByClientId(clientId: string): Promise<Service[]>;
  getServicesByArchiveId(archiveId: string): Promise<Service[]>;
  listAllServices(): Promise<Service[]>;
}
