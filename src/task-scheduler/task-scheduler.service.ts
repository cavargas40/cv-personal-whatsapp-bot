/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { WhatsappBotService } from 'src/whatsapp-bot/whatsapp-bot.service';

@Injectable()
export class TaskSchedulerService {
  private readonly logger = new Logger(TaskSchedulerService.name);

  constructor(private whatsappService: WhatsappBotService) {}

  private readonly CHAT_IDS = {
    JORGE_DUQUE_LEINARES: '573166291498-1424277590@g.us',
    BLACKETE: '573164125998@c.us',
  };

  private readonly MESSAGES = {
    UMM_VIEJO_HP: this.getViejoHptaMessage,
    BLACKETE_TIME_DOING_C_SHARP_COURSE:
      this.getBlacketeTimeDoingCSharpCourseMessage,
  };

  getViejoHptaMessage() {
    const now = DateTime.now().toLocaleString(
      DateTime.DATETIME_MED_WITH_SECONDS,
    );

    return `ummmmmmm viejo hp 👴🏻 es hora de hacerme el delicioso 🍆 - ${now}`;
  }

  static getCorrectPluralization(
    unity: number,
    singular: string,
    plural: string,
  ) {
    return unity === 1 ? singular : plural;
  }

  getBlacketeTimeDoingCSharpCourseMessage() {
    const cSharpCouseGiftDate = DateTime.fromISO('2022-01-12T18:24:15.123');
    const now = DateTime.now();

    const years = +Math.abs(now.diff(cSharpCouseGiftDate, 'years').years).toFixed(2);
    const months = +Math.abs(now.diff(cSharpCouseGiftDate, 'months').months).toFixed(0);
    const weeks = +Math.abs(+cSharpCouseGiftDate.diffNow('weeks').weeks).toFixed(0);
    const days = +Math.abs(+cSharpCouseGiftDate.diffNow('days').days).toFixed(0);
    const hours = +Math.abs(+cSharpCouseGiftDate.diffNow('hours').hours).toFixed(0);
    const minutes = +Math.abs(+cSharpCouseGiftDate.diffNow('minutes').minutes).toFixed(0);
    const seconds = +Math.abs(+cSharpCouseGiftDate.diffNow('seconds').seconds).toFixed(0);

    const yearsFormatted = TaskSchedulerService.getCorrectPluralization(
      years,
      'año',
      'años',
    );

    const monthsFormatted = TaskSchedulerService.getCorrectPluralization(
      months,
      'mes',
      'meses',
    );

    const weeksFormatted = TaskSchedulerService.getCorrectPluralization(
      weeks,
      'semana',
      'semanas',
    );

    const daysFormatted = TaskSchedulerService.getCorrectPluralization(
      days,
      'dia',
      'dias',
    );

    const hoursFormatted = TaskSchedulerService.getCorrectPluralization(
      hours,
      'hora',
      'horas',
    );

    const minutesFormatted = TaskSchedulerService.getCorrectPluralization(
      minutes,
      'minuto',
      'minutos',
    );

    const secondsFormatted = TaskSchedulerService.getCorrectPluralization(
      seconds,
      'segundo',
      'segundos',
    );

    const numberFormatter = new Intl.NumberFormat();

    return `
      👴🏻 Blackete ctm 💃 
      Ya termino el curso de C#? 🤔
      Lleva en eso: 
      - ${numberFormatter.format(years)} ${yearsFormatted}
      - ${numberFormatter.format(months)} ${monthsFormatted}
      - ${numberFormatter.format(weeks)} ${weeksFormatted}
      - ${numberFormatter.format(days)} ${daysFormatted}
      - ${numberFormatter.format(hours)} ${hoursFormatted}
      - ${numberFormatter.format(minutes)} ${minutesFormatted}
      - ${numberFormatter.format(+seconds.toFixed(0))} ${secondsFormatted}
      👨🏻‍💻 terminelo YA. LA RE PTM. 😡`;
  }

  @Cron(CronExpression.EVERY_SECOND)
  handleCron() {
    const message = this.MESSAGES.BLACKETE_TIME_DOING_C_SHARP_COURSE();

    const delaySeconds = 5;

    setTimeout(() => {
      this.whatsappService.sendMessage(this.CHAT_IDS.BLACKETE, message);
      this.whatsappService.sendMessage(
        this.CHAT_IDS.JORGE_DUQUE_LEINARES,
        message,
      );
    }, delaySeconds * 1000);
  }
}
