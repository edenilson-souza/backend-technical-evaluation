import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { ListAllServicesUseCase } from 'src/core/application/use-cases/service/list-all-services';
import { CreateServiceUseCase } from 'src/core/application/use-cases/service/create-service';
import { GetServiceByIdUseCase } from 'src/core/application/use-cases/service/get-service-by-id';
import { ChangeStatusServiceUseCase } from 'src/core/application/use-cases/service/change-status-service';
import { ChangeStatusDto } from './dto/change-status-service.dto';
import { SendServiceToArchitectUseCase } from 'src/core/application/use-cases/service/send-service-to-architect';
import { SendServiceToArchitectDto } from './dto/send-service-to-architect.dto';
import { GetServicesByArchitectIdUseCase } from 'src/core/application/use-cases/service/get-services-by-architect-id';
import { GetServicesByClientIdUseCase } from 'src/core/application/use-cases/service/get-services-by-client-id';
import { UpdateServiceUseCase } from 'src/core/application/use-cases/service/update-service';
import { DeleteServiceUseCase } from 'src/core/application/use-cases/service/delete-service';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    private listAllServices: ListAllServicesUseCase,
    private createService: CreateServiceUseCase,
    private getServiceById: GetServiceByIdUseCase,
    private changeStatusService: ChangeStatusServiceUseCase,
    private sendServiceToArchitect: SendServiceToArchitectUseCase,
    private getServicesByArchitectId: GetServicesByArchitectIdUseCase,
    private getServicesByClientId: GetServicesByClientIdUseCase,
    private updateService: UpdateServiceUseCase,
    private deleteService: DeleteServiceUseCase,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    return await this.createService.execute(createServiceDto);
  }

  async findAll() {
    return await this.listAllServices.execute();
  }

  async findOne(id: string) {
    return await this.getServiceById.execute(id);
  }

  async changeStatus(id: string, changeStatusDto: ChangeStatusDto) {
    return await this.changeStatusService.execute({
      id: id,
      status: changeStatusDto.status,
    });
  }

  async sendService(sendServiceDto: SendServiceToArchitectDto) {
    return await this.sendServiceToArchitect.execute(sendServiceDto);
  }

  async findAllServiceByArchitectId(id: string) {
    return await this.getServicesByArchitectId.execute(id);
  }

  async findAllServiceByClientId(id: string) {
    return await this.getServicesByClientId.execute(id);
  }

  async update(
    id: string,
    id_client: string,
    updateServiceDto: UpdateServiceDto,
  ) {
    return await this.updateService.execute({
      id: id,
      id_client: id_client,
      description: updateServiceDto.description,
      id_architect: updateServiceDto.id_architect,
    });
  }

  async remove(id: string) {
    return await this.deleteService.execute(id);
  }
}
