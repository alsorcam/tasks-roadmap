import {
  addDays,
  differenceInBusinessDays,
  endOfWeek,
  fromUnixTime,
  getUnixTime,
  getWeek,
  isWeekend,
  min,
  startOfWeek,
  sub,
} from 'date-fns';
import { WeekDateRange } from '../types/week';

export class DateUtil {
  static getWeekNumber(date: Date): number {
    return getWeek(date, { weekStartsOn: 1 });
  }

  static getWeekDateRange(date: Date): WeekDateRange {
    return {
      startDate: startOfWeek(date, { weekStartsOn: 1 }),
      endDate: sub(endOfWeek(date, { weekStartsOn: 1 }), { days: 2 }),
    };
  }

  static daysInRange(startDate: Date, endDate: Date): number {
    return differenceInBusinessDays(endDate, startDate) + 1;
  }

  static resetHour(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    );
  }

  static addDays(date: Date, duration: number): Date {
    return addDays(date, duration);
  }

  static isWeekend(date: Date): boolean {
    return isWeekend(date);
  }

  static getDateFromUnix(unixTimestamp: number): Date {
    return fromUnixTime(unixTimestamp);
  }

  static getUnixTime(date: Date): number {
    return getUnixTime(date);
  }

  static earliestDate(dates: Date[]): Date {
    return min(dates);
  }
}
