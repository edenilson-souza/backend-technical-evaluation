import { LoginUserUseCase } from 'src/core/application/use-cases/user/login-user';
import { SignupUserUseCase } from 'src/core/application/use-cases/user/signup-user';
import UserRepositoryMemory from 'src/core/infra/repositories/in-memory/user-repository-in-memory';

const makeUserUseCases = () => {
  const userRepository = new UserRepositoryMemory();

  const login = new LoginUserUseCase(userRepository);
  const signup = new SignupUserUseCase(userRepository);

  return {
    signup,
    login,
  };
};

describe('Architect use cases', () => {
  it('Should signup an user with the correct data and login', async () => {
    const { signup, login } = makeUserUseCases();
    const inputSignup = {
      name: 'John Doe',
      email: 'John.Doe@gmail.com',
      password: 'Password$123',
      age: 30,
      gender: 'Male',
    };

    await signup.execute(inputSignup);

    const inputLogin = {
      email: 'John.Doe@gmail.com',
      password: 'Password$123',
    };

    const user = await login.execute({
      email: inputLogin.email,
      password: inputLogin.password,
    });

    expect(user.name).toBe(inputSignup.name);
    expect(user.token).toBe('jwt-token');
  });
});
