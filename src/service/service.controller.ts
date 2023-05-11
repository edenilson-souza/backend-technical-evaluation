import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Response } from 'express';
import { ChangeStatusDto } from './dto/change-status-service.dto';
import { SendServiceToArchitectDto } from './dto/send-service-to-architect.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Res() response: Response,
  ) {
    try {
      const service = await this.serviceService.create(createServiceDto);

      return response.json(service);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const services = await this.serviceService.findAll();

      return response.json(services);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  @Get('requested/:id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const service = await this.serviceService.findOne(id);

      return response.json(service);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  @Patch('requests/:id')
  async changeStatus(
    @Param('id') id: string,
    @Body() changeStatusDto: ChangeStatusDto,
    @Res() response: Response,
  ) {
    try {
      const service = await this.serviceService.changeStatus(
        id,
        changeStatusDto,
      );

      return response.status(200).json(service);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  @Post('send')
  async sendService(
    @Body() sendServiceDto: SendServiceToArchitectDto,
    @Res() response: Response,
  ) {
    try {
      await this.serviceService.sendService(sendServiceDto);
      return response.status(200).send();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  @Get('requests')
  async findAllServiceByArchitectId(
    @Query('id') id: string,
    @Res() response: Response,
  ) {
    try {
      const services = await this.serviceService.findAllServiceByArchitectId(
        id,
      );

      return response.status(200).json(services);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  @Get('requested')
  async findAllServiceByClientId(
    @Query('id') id: string,
    @Res() response: Response,
  ) {
    try {
      const services = await this.serviceService.findAllServiceByClientId(id);
      return response.status(200).json(services);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  @Patch('requested/:id')
  async update(
    @Param('id') id: string,
    @Query('id_client') id_client: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Res() response: Response,
  ) {
    try {
      const service = await this.serviceService.update(
        id,
        id_client,
        updateServiceDto,
      );
      return response.status(200).json(service);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  @Delete('requested/:id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.serviceService.remove(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
