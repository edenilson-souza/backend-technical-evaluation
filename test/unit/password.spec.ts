import Password from 'src/core/domain/entities/password';

describe('Password', () => {
  test('Should create a valid password', () => {
    const input = 'Password$123';
    const password = new Password(input);

    expect(password.value).toBe(input);
  });
  test('Should not create a valid password', () => {
    expect(() => new Password('Password123')).toThrow(
      new Error('Invalid password'),
    );
  });
});
