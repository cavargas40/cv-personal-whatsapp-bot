import { Injectable, Logger } from '@nestjs/common';
import { DateTime } from 'luxon';
import { CHAT_IDS } from 'src/shared/enum/chat.enum';
import { Message, MessageTypes } from 'whatsapp-web.js';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  getViejoHptaMessage() {
    const now = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);

    return `ummmmmmm viejo hp 👴🏻 es hora de hacerme el delicioso 🍆 - ${now}`;
  }

  static getCorrectPluralization(unity: number, singular: string, plural: string) {
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

    const yearsFormatted = ChatService.getCorrectPluralization(years, 'año', 'años');

    const monthsFormatted = ChatService.getCorrectPluralization(months, 'mes', 'meses');

    const weeksFormatted = ChatService.getCorrectPluralization(weeks, 'semana', 'semanas');

    const daysFormatted = ChatService.getCorrectPluralization(days, 'dia', 'dias');

    const hoursFormatted = ChatService.getCorrectPluralization(hours, 'hora', 'horas');

    const minutesFormatted = ChatService.getCorrectPluralization(minutes, 'minuto', 'minutos');

    const secondsFormatted = ChatService.getCorrectPluralization(seconds, 'segundo', 'segundos');

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
    };
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
    } = ChatService.calculateDateSectionsAccumulatedDiff(cSharpCouseGiftDate);

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

  isMessageFromBlackete(message: Message): boolean {
    return message.author === CHAT_IDS.BLACKETE;
  }

  isStupidBlacketeMessage(message: Message): boolean {
    const regexHHMM = new RegExp(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]/);
    return regexHHMM.test(message.body.trim());
  }

  isTextMessage(message: Message): boolean {
    return message.type === MessageTypes.TEXT;
  }
}
