import { EntitySchema } from 'typeorm';
import { User } from 'src/core/domain/entities/user';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  target: User,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    gender: {
      type: 'string',
    },
    age: {
      type: 'integer',
    },
  },
});
