import { Module } from '@nestjs/common';
import { WhatsappBotModule } from 'src/whatsapp-bot/whatsapp-bot.module';
import { TaskSchedulerService } from './task-scheduler.service';

@Module({
  imports: [WhatsappBotModule],
  providers: [TaskSchedulerService],
})
export class TaskSchedulerModule {}
