import { randomUUID } from 'node:crypto';

export class Service {
  private _id: string;
  private _id_architect: string | null;
  private _status: ServiceStatus;

  constructor(
    readonly id_client: string,
    readonly description: string,
    id?: string,
    id_architect?: string,
    status?: ServiceStatus,
  ) {
    this._id = id || randomUUID();
    this._id_architect = id_architect || null;
    this._status = status || 'available';

    if (description.length === 0) throw new Error('Description invalid');
  }

  static create(input: Input) {
    return new Service(input.id_client, input.description);
  }

  get id(): string {
    return this._id;
  }

  get id_architect(): string {
    return this._id_architect;
  }

  set id_architect(value: string) {
    this._id_architect = value;
  }

  get status(): ServiceStatus {
    return this._status;
  }

  changeStatus(status: ServiceStatus): void {
    this._status = status;
  }
}

type Input = {
  id_client: string;
  description: string;
};

export type ServiceStatus = 'accepted' | 'refused' | 'available';
