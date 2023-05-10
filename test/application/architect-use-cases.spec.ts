import { ListAllArchitectsUseCase } from 'src/core/application/use-cases/architect/list-all-architects';
import { LoginArchitectUseCase } from 'src/core/application/use-cases/architect/login-architect';
import { SignupArchitectUseCase } from 'src/core/application/use-cases/architect/signup-architect';
import ArchitectRepositoryMemory from 'src/core/infra/repositories/in-memory/architect-repository-in-memory';

const makeArchitectUseCases = () => {
  const architectRepository = new ArchitectRepositoryMemory();

  const login = new LoginArchitectUseCase(architectRepository);
  const signup = new SignupArchitectUseCase(architectRepository);
  const listAllArchitects = new ListAllArchitectsUseCase(architectRepository);

  return {
    signup,
    login,
    listAllArchitects,
  };
};

describe('Architect use cases', () => {
  it('Should signup an architect with the correct data and login', async () => {
    const { signup, login } = makeArchitectUseCases();
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

    const architect = await login.execute({
      email: inputLogin.email,
      password: inputLogin.password,
    });

    expect(architect.name).toBe(inputSignup.name);
    expect(architect.token).toBe('jwt-token');
  });
  it('Should list all architects', async () => {
    const { listAllArchitects } = makeArchitectUseCases();

    const architects = await listAllArchitects.execute();

    expect(architects.length).toBe(0);
  });

  it('Should not be created architect  if the email is already in use.', async () => {
    const { signup } = makeArchitectUseCases();

    const inputSignup = {
      name: 'John Doe',
      email: 'John.Doe@gmail.com',
      password: 'Password$123',
      age: 30,
      gender: 'Male',
    };

    await signup.execute(inputSignup);

    await expect(() => signup.execute(inputSignup)).rejects.toThrow(
      new Error('Email is already registered.'),
    );
  });
});
