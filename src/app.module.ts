import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArchitectModule } from './architect/architect.module';

@Module({
  imports: [UserModule, ArchitectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
