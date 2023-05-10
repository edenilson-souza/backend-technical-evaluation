import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import UserRepositoryMemory from 'src/core/infra/repositories/in-memory/user-repository-in-memory';
import { SignupUserUseCase } from 'src/core/application/use-cases/user/signup-user';
import { UserRepository } from 'src/core/application/repositories/user-repository';
import { LoginUserUseCase } from 'src/core/application/use-cases/user/login-user';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepositoryMemory, useClass: UserRepositoryMemory },
    {
      provide: SignupUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new SignupUserUseCase(userRepository),
      inject: [UserRepositoryMemory],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new LoginUserUseCase(userRepository),
      inject: [UserRepositoryMemory],
    },
  ],
})
export class UserModule {}
