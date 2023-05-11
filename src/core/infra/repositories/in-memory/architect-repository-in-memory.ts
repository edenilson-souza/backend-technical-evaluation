import { ArchitectRepository } from 'src/core/application/repositories/architect-repository';
import { Architect } from 'src/core/domain/entities/architect';

export default class ArchitectRepositoryMemory implements ArchitectRepository {
  architects: Architect[];

  constructor() {
    this.architects = [];
  }

  async save(architect: Architect): Promise<void> {
    this.architects.push(architect);
  }

  async listAll(): Promise<Architect[]> {
    return this.architects;
  }

  async getByEmail(email: string): Promise<Architect | undefined> {
    return this.architects.find((architect) => architect.email === email);
  }
}
