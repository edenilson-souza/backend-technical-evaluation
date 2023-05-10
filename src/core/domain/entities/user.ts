import Email from './email';
import Name from './name';
import Password from './password';
import { randomUUID } from 'node:crypto';

export class User {
  public readonly id: string;

  constructor(
    readonly name: Name,
    readonly email: Email,
    readonly password: Password,
    readonly gender: string,
    readonly age: number,
    id?: string,
  ) {
    this.id = id || randomUUID();
  }

  static create(input: Input): User {
    return new User(
      new Name(input.name),
      new Email(input.email),
      new Password(input.password),
      input.gender,
      input.age,
    );
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
};
