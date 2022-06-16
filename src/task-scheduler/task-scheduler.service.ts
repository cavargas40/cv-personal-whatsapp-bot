/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CHAT_IDS, PERSON_DOMAIN } from 'src/shared/enum/chat.enum';
import { ChatService } from 'src/whatsapp-bot/chat/chat.service';
import { WhatsappBotService } from 'src/whatsapp-bot/whatsapp-bot.service';

@Injectable()
export class TaskSchedulerService {
  private readonly logger = new Logger(TaskSchedulerService.name);

  constructor(private whatsappService: WhatsappBotService, private chatService: ChatService) {}

  // Cron deactivated to stop spaming chat and only replying when new message is received
  // @Cron(CronExpression.EVERY_2_HOURS)
  // handleCron() {
  //   const message = this.chatService.getBlacketeTimeDoingCSharpCourseMessage();

  //   const delaySeconds = 5;

  //   setTimeout(() => {
  //     this.whatsappService.sendMessage(CHAT_IDS.BLACKETE, message.replace(CHAT_IDS.BLACKETE.replace(PERSON_DOMAIN, ''), 'Blackete'));
  //     this.whatsappService.sendMessage(
  //       CHAT_IDS.JORGE_DUQUE_LEINARES,
  //       message,
  //     );
  //   }, delaySeconds * 1000);
  // }
}
