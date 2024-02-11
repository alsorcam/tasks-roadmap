import { endOfWeek, getWeek, startOfWeek, sub } from 'date-fns';
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
}
