import { Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserUseCase } from 'src/core/application/use-cases/user/signup-user';
import { LoginUserUseCase } from 'src/core/application/use-cases/user/login-user';

@Injectable()
export class UserService {
  constructor(
    private signupUseCase: SignupUserUseCase,
    private loginUseCase: LoginUserUseCase,
  ) {}

  async signup(signupUserDto: SignupUserDto) {
    return await this.signupUseCase.execute(signupUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    return await this.loginUseCase.execute(loginUserDto);
  }
}
