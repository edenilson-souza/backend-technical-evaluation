import Name from 'src/core/domain/entities/name';

describe('Name', () => {
  test('Should create a valid name', () => {
    const input = 'John Doe';
    const name = new Name(input);

    expect(name.value).toBe(input);
  });
  test('Should not create a valid name', () => {
    expect(() => new Name('John')).toThrow(new Error('Invalid name'));
  });
});
