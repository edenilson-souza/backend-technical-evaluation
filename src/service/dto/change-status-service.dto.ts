import { ServiceStatus } from 'src/core/domain/entities/service';

export class ChangeStatusDto {
  status: ServiceStatus;
}
