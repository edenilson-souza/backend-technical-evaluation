import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceRepositoryInMemory } from 'src/core/infra/repositories/in-memory/service-repository-in-memory';
import { CreateServiceUseCase } from 'src/core/application/use-cases/service/create-service';
import { ServiceRepository } from 'src/core/application/repositories/service-repository';
import { GetServiceByIdUseCase } from 'src/core/application/use-cases/service/get-service-by-id';
import { ListAllServicesUseCase } from 'src/core/application/use-cases/service/list-all-services';
import { ChangeStatusServiceUseCase } from 'src/core/application/use-cases/service/change-status-service';
import { SendServiceToArchitectUseCase } from 'src/core/application/use-cases/service/send-service-to-architect';
import { GetServicesByArchitectIdUseCase } from 'src/core/application/use-cases/service/get-services-by-architect-id';
import { GetServicesByClientIdUseCase } from 'src/core/application/use-cases/service/get-services-by-client-id';
import { UpdateServiceUseCase } from 'src/core/application/use-cases/service/update-service';
import { DeleteServiceUseCase } from 'src/core/application/use-cases/service/delete-service';

@Module({
  controllers: [ServiceController],
  providers: [
    ServiceService,
    {
      provide: ServiceRepositoryInMemory,
      useClass: ServiceRepositoryInMemory,
    },
    {
      provide: CreateServiceUseCase,
      useFactory: (serviceRepository: ServiceRepository) =>
        new CreateServiceUseCase(serviceRepository),
      inject: [ServiceRepositoryInMemory],
    },
    {
      provide: ListAllServicesUseCase,
      useFactory: (serviceRepository: ServiceRepository) =>
        new ListAllServicesUseCase(serviceRepository),
      inject: [ServiceRepositoryInMemory],
    },
    {
      provide: GetServiceByIdUseCase,
      useFactory: (serviceRepository: ServiceRepository) =>
        new GetServiceByIdUseCase(serviceRepository),
      inject: [ServiceRepositoryInMemory],
    },
    {
      provide: ChangeStatusServiceUseCase,
      useFactory: (serviceRepository: ServiceRepository) =>
        new ChangeStatusServiceUseCase(serviceRepository),
      inject: [ServiceRepositoryInMemory],
    },
    {
      provide: SendServiceToArchitectUseCase,
      useFactory: (serviceRepository: ServiceRepository) =>
        new SendServiceToArchitectUseCase(serviceRepository),
      inject: [ServiceRepositoryInMemory],
    },
    {
      provide: GetServicesByArchitectIdUseCase,
      useFactory: (serviceRepository: ServiceRepository) =>
        new GetServicesByArchitectIdUseCase(serviceRepository),
      inject: [ServiceRepositoryInMemory],
    },
    {
      provide: GetServicesByClientIdUseCase,
      useFactory: (serviceRepository: ServiceRepository) =>
        new GetServicesByClientIdUseCase(serviceRepository),
      inject: [ServiceRepositoryInMemory],
    },
    {
      provide: UpdateServiceUseCase,
      useFactory: (serviceRepository: ServiceRepository) =>
        new UpdateServiceUseCase(serviceRepository),
      inject: [ServiceRepositoryInMemory],
    },
    {
      provide: DeleteServiceUseCase,
      useFactory: (serviceRepository: ServiceRepository) =>
        new DeleteServiceUseCase(serviceRepository),
      inject: [ServiceRepositoryInMemory],
    },
  ],
})
export class ServiceModule {}
