/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { CHAT_IDS, PERSON_DOMAIN } from 'src/shared/enum/chat.enum';
import { WhatsappBotService } from 'src/whatsapp-bot/whatsapp-bot.service';

@Injectable()
export class TaskSchedulerService {
  private readonly logger = new Logger(TaskSchedulerService.name);

  constructor(private whatsappService: WhatsappBotService) {}

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

  static calculateDateSectionsAccumulatedDiff(cSharpCouseGiftDate: DateTime) {
    const years = +Math.abs(cSharpCouseGiftDate.diffNow('years').years).toFixed(2);
    const months = +Math.abs(cSharpCouseGiftDate.diffNow('months').months).toFixed(0);
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

    return {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      yearsFormatted,
      monthsFormatted,
      weeksFormatted,
      daysFormatted,
      hoursFormatted,
      minutesFormatted,
      secondsFormatted,
    }
  }

  getBlacketeTimeDoingCSharpCourseMessage() {
    const numberFormatter = new Intl.NumberFormat();

    const cSharpCouseGiftDate = DateTime.fromISO('2022-01-12T18:24:15.123');

    const {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      yearsFormatted,
      monthsFormatted,
      weeksFormatted,
      daysFormatted,
      hoursFormatted,
      minutesFormatted,
      secondsFormatted,
    } = TaskSchedulerService.calculateDateSectionsAccumulatedDiff(cSharpCouseGiftDate);

    return `
      👴🏻 @${CHAT_IDS.BLACKETE.replace(PERSON_DOMAIN, '')} ctm 💃 
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

  @Cron(CronExpression.EVERY_2_HOURS)
  handleCron() {
    const message = this.MESSAGES.BLACKETE_TIME_DOING_C_SHARP_COURSE();

    const delaySeconds = 5;

    setTimeout(() => {
      this.whatsappService.sendMessage(CHAT_IDS.BLACKETE, message.replace(CHAT_IDS.BLACKETE.replace(PERSON_DOMAIN, ''), 'Blackete'));
      this.whatsappService.sendMessage(
        CHAT_IDS.JORGE_DUQUE_LEINARES,
        message,
      );
    }, delaySeconds * 1000);
  }
}
