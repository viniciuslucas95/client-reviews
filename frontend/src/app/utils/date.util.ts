import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class DateUtil {
  formatToPtString(date: string | Date) {
    const dateString = typeof date === 'string' ? date : date.toISOString();

    const [splittedDate, splittedTime] = dateString.split('T');
    const [year, month, day] = splittedDate.split('-');
    const time = splittedTime.split('.')[0];

    return `${day}/${month}/${year} ${time}`;
  }

  formatToPtStringMonthAndYear(date: string | Date) {
    const dateString = typeof date === 'string' ? date : date.toISOString();

    const [splittedDate] = dateString.split('T');
    const [year, month] = splittedDate.split('-');

    return `${month}/${year}`;
  }

  formatToPtStringDayMonthAndYear(date: string | Date) {
    const dateString = typeof date === 'string' ? date : date.toISOString();

    const [splittedDate] = dateString.split('T');
    const [year, month, day] = splittedDate.split('-');

    return `${day}/${month}/${year}`;
  }

  isValid(value: any) {
    if (value === null || value === undefined) return false;
    if (typeof value === 'object') return false;

    const stringifiedValue = value.toString();

    const [day, month, year] = stringifiedValue.toString().split('/');

    if (!month) return false;
    if (!year) return false;

    if (year.length !== 4 || month.length !== 2 || day.length !== 2)
      return false;

    const dayAndMonthPattern = /^[0-9]{2}$/;
    const yearPattern = /^[0-9]{4}$/;

    if (!dayAndMonthPattern.test(day)) return false;
    if (!dayAndMonthPattern.test(month)) return false;
    if (!yearPattern.test(year)) return false;

    const parsedDay = parseInt(day);
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    if (isNaN(parsedDay) || isNaN(parsedMonth) || isNaN(parsedYear))
      return false;

    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (parsedYear < 1800) return false;

    const isValid = !isNaN(
      Date.parse(`${year}-${month.padStart(2, '0')}-${day}`),
    );

    return isValid;
  }
}
