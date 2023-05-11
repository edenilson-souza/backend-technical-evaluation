import Email from './email';
import Name from './name';
import Password from './password';
import { randomUUID } from 'node:crypto';

export class Architect {
  public readonly id: string;
  public readonly name: string;
  public readonly password: string;
  public readonly email: string;

  private constructor(
    name: Name,
    email: Email,
    password: Password,
    readonly gender: string,
    readonly age: number,
    id?: string,
  ) {
    this.id = id || randomUUID();
    this.name = name.value;
    this.email = email.value;
    this.password = password.value;
  }

  static create(input: Input): Architect {
    return new Architect(
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
