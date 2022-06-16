import { Module } from '@nestjs/common';
import { WhatsappBotService } from './whatsapp-bot.service';
import { ChatService } from './chat/chat.service';

@Module({
  providers: [WhatsappBotService, ChatService],
  exports: [WhatsappBotService, ChatService],
})
export class WhatsappBotModule {}
