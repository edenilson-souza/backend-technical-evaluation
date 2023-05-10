import { User } from 'src/core/domain/entities/user';

export interface UserRepository {
  save(user: User): Promise<void>;
  getByEmail(email: string): Promise<User>;
}
