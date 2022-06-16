import { Injectable, Logger } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';

@Injectable()
export class WhatsappBotService {
  private readonly logger = new Logger(WhatsappBotService.name);
  private client: Client;
  private ready = false;

  constructor() {
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

    // this.client.on('message', async (msg) => {
    //   this.logger.log({ where: 'message', msg });
    // });

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
      this.logger.error(
        { where: 'WhatsappBotService.sendMessage', error },
        error.stack,
      );
    }
  }
}
