import Email from 'src/core/domain/entities/Email';

describe('Email', () => {
  test('Should create a valid e-mail', () => {
    const input = 'example@example.com';
    const email = new Email(input);

    expect(email.value).toBe(input);
  });

  test('Should not create a valid e-mail', () => {
    const input = 'example.example.com';

    expect(() => new Email(input)).toThrow(new Error('Invalid e-mail'));
  });
});
