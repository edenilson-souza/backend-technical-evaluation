import Email from './email';
import Name from './name';
import Password from './password';
import { randomUUID } from 'node:crypto';

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;

  constructor(
    name: Name,
    email: Email,
    password: Password,
    public readonly gender: string,
    public readonly age: number,
    id?: string,
  ) {
    this.id = id || randomUUID();
    this.name = name.value;
    this.email = email.value;
    this.password = password.value;
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
