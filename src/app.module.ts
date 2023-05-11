import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArchitectModule } from './architect/architect.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [UserModule, ArchitectModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
