import { Module } from '@nestjs/common';
import { ArchitectService } from './architect.service';
import { ArchitectController } from './architect.controller';
import ArchitectRepositoryMemory from 'src/core/infra/repositories/in-memory/architect-repository-in-memory';
import { SignupArchitectUseCase } from 'src/core/application/use-cases/architect/signup-architect';
import { ArchitectRepository } from 'src/core/application/repositories/architect-repository';
import { LoginArchitectUseCase } from 'src/core/application/use-cases/architect/login-architect';
import { ListAllArchitectsUseCase } from 'src/core/application/use-cases/architect/list-all-architects';

@Module({
  controllers: [ArchitectController],
  providers: [
    ArchitectService,
    {
      provide: ArchitectRepositoryMemory,
      useClass: ArchitectRepositoryMemory,
    },
    {
      provide: SignupArchitectUseCase,
      useFactory: (architectRepository: ArchitectRepository) =>
        new SignupArchitectUseCase(architectRepository),
      inject: [ArchitectRepositoryMemory],
    },
    {
      provide: LoginArchitectUseCase,
      useFactory: (architectRepository: ArchitectRepository) =>
        new LoginArchitectUseCase(architectRepository),
      inject: [ArchitectRepositoryMemory],
    },
    {
      provide: ListAllArchitectsUseCase,
      useFactory: (architectRepository: ArchitectRepository) =>
        new ListAllArchitectsUseCase(architectRepository),
      inject: [ArchitectRepositoryMemory],
    },
  ],
})
export class ArchitectModule {}
