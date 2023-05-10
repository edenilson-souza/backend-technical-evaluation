import { Injectable } from '@nestjs/common';
import { LoginArchitectDto } from './dto/login-architect.dto';
import { SignupArchitectDto } from './dto/signup-architect.dto';
import { LoginArchitectUseCase } from 'src/core/application/use-cases/architect/login-architect';
import { SignupArchitectUseCase } from 'src/core/application/use-cases/architect/signup-architect';
import { ListAllArchitectsUseCase } from 'src/core/application/use-cases/architect/list-all-architects';

@Injectable()
export class ArchitectService {
  constructor(
    private loginUseCase: LoginArchitectUseCase,
    private signupUseCase: SignupArchitectUseCase,
    private listAllUseCase: ListAllArchitectsUseCase,
  ) {}

  async login(loginArchitectDto: LoginArchitectDto) {
    return await this.loginUseCase.execute(loginArchitectDto);
  }

  async signup(signupArchitectDto: SignupArchitectDto) {
    return await this.signupUseCase.execute(signupArchitectDto);
  }

  async listAll() {
    return await this.listAllUseCase.execute();
  }
}
