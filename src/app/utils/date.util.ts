import {
  addDays,
  differenceInBusinessDays,
  endOfWeek,
  fromUnixTime,
  getUnixTime,
  getWeek,
  isAfter,
  isWeekend,
  min,
  setDay,
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

  static setDayOfWeek(date: Date, dayOfWeek: number): Date {
    return setDay(date, dayOfWeek, { weekStartsOn: 1 });
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

  static endsAfterWeekend(startDate: Date, endDate: Date): boolean {
    const weekSunday = endOfWeek(startDate, { weekStartsOn: 1 });
    const weekFriday = sub(endOfWeek(startDate, { weekStartsOn: 1 }), {
      days: 2,
    });
    return this.isWeekend(endDate) || isAfter(endDate, weekSunday);
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
