export default class Name {
  constructor(private name: string) {
    if (name.split(' ').length < 2) {
      throw new Error('Invalid name');
    }
  }

  get value(): string {
    return this.name;
  }
}
