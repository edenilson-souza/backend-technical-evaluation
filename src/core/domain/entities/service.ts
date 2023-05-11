import { randomUUID } from 'node:crypto';

export class Service {
  public id: string;
  public id_architect: string | null;
  public status: ServiceStatus;

  constructor(
    public id_client: string,
    public description: string,
    id?: string,
    id_architect?: string,
    status?: ServiceStatus,
  ) {
    this.id = id || randomUUID();
    this.id_architect = id_architect || null;
    this.status = status || 'available';

    if (description.length === 0) throw new Error('Description invalid');
  }

  static create(input: Input) {
    return new Service(input.id_client, input.description);
  }

  changeStatus(status: ServiceStatus): void {
    this.status = status;
  }
}

type Input = {
  id_client: string;
  description: string;
};

export type ServiceStatus = 'accepted' | 'refused' | 'available';
