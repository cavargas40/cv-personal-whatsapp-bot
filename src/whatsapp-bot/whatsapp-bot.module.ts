import { Module } from '@nestjs/common';
import { WhatsappBotService } from './whatsapp-bot.service';

@Module({
  providers: [WhatsappBotService],
  exports: [WhatsappBotService],
})
export class WhatsappBotModule {}
