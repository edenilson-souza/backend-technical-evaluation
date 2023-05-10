import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(
    @Body() signupUserDto: SignupUserDto,
    @Res() response: Response,
  ) {
    try {
      await this.userService.signup(signupUserDto);
      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    try {
      const user = await this.userService.login(loginUserDto);
      return response.status(201).json(user);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}
