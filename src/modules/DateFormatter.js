import { format, isToday, isThisWeek } from 'date-fns';

export default class DateFormatter {
  static formatDate(inputDate) {
    inputDate = new Date(inputDate);
    let dateFormatted = format(inputDate, 'dd/MM/yyyy');
    return dateFormatted;
  }

  static isDayToday(date) {
    date = new Date(date);
    const result = isToday(date);
    return result;
  }

  static isDayWeekDay(date) {
    date = new Date(date);
    const result = isThisWeek(date, { weekStartsOn: 1 });
    return result;
  }
}
