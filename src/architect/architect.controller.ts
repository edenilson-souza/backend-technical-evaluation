import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ArchitectService } from './architect.service';
import { LoginArchitectDto } from './dto/login-architect.dto';
import { SignupArchitectDto } from './dto/signup-architect.dto';
import { Response } from 'express';

@Controller('architect')
export class ArchitectController {
  constructor(private readonly architectService: ArchitectService) {}

  @Post('/login')
  async login(
    @Body() loginArchitectDto: LoginArchitectDto,
    @Res() response: Response,
  ) {
    try {
      const architect = await this.architectService.login(loginArchitectDto);

      return response.json(architect);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }

  @Post('/signup')
  async signup(
    @Body() signupArchitectDto: SignupArchitectDto,
    @Res() response: Response,
  ) {
    try {
      await this.architectService.signup(signupArchitectDto);
      return response.status(201).send();
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const architects = await this.architectService.listAll();

      return response.json(architects);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
