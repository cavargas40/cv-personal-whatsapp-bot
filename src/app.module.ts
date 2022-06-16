import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import appConfig from 'config/app.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappBotModule } from './whatsapp-bot/whatsapp-bot.module';
import { TaskSchedulerModule } from './task-scheduler/task-scheduler.module';
import { ApiLayerModule } from './api-layer/api-layer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    ScheduleModule.forRoot(),
    WhatsappBotModule,
    TaskSchedulerModule,
    ApiLayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
