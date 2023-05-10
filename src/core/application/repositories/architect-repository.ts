import { Architect } from 'src/core/domain/entities/architect';

export interface ArchitectRepository {
  save(architect: Architect): Promise<void>;
  getByEmail(email: string): Promise<Architect>;
  listAll(): Promise<Architect[]>;
}
