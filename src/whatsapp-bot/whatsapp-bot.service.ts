import { Injectable, Logger } from '@nestjs/common';
import { CHAT_IDS, PERSON_DOMAIN } from 'src/shared/enum/chat.enum';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import { ChatService } from './chat/chat.service';

@Injectable()
export class WhatsappBotService {
  private readonly logger = new Logger(WhatsappBotService.name);
  private client: Client;
  private ready = false;

  constructor(private chatService: ChatService) {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: false },
    });

    this.client.initialize();

    this.client.on('authenticated', () => {
      this.logger.log('Authenticated');
    });

    this.client.on('disconnected', (reason) => {
      this.logger.log('Client was logged out', reason);
    });

    this.client.on('message', async (message) => {
      this.handleIncomingMessage(message);
    });

    this.client.on('ready', () => {
      this.ready = true;
      this.logger.log('READY');
    });
  }

  sendMessage(chatId: string, message: string) {
    try {
      if (!this.ready) {
        return;
      }
      this.logger.log({
        where: 'WhatsappBotService.sendMessage',
        chatId,
        message,
      });
      this.client.sendMessage(chatId, message);
    } catch (error) {
      this.logger.error({ where: 'WhatsappBotService.sendMessage', error }, error.stack);
    }
  }

  handleIncomingMessage(message: Message) {
    if (!this.chatService.isTextMessage(message)) {
      return;
    }

    // Blackete ctm 💃
    if (this.chatService.isMessageFromBlackete(message) && this.chatService.isStupidBlacketeMessage(message)) {
      const responseMessage = this.chatService.getBlacketeTimeDoingCSharpCourseMessage();
      this.sendMessage(CHAT_IDS.JORGE_DUQUE_LEINARES, responseMessage);
      this.sendMessage(
        CHAT_IDS.BLACKETE,
        responseMessage.replace(CHAT_IDS.BLACKETE.replace(PERSON_DOMAIN, ''), 'Blackete'),
      );
    }
  }
}
