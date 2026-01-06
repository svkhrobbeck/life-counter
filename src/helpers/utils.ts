import moment from "moment";
import months from "../data/months.json";
import { DocumentData, IMonth, IDateParts } from "./interfaces";

export const parseReactForm = <T extends DocumentData>(e: React.FormEvent<HTMLFormElement>, reset: boolean = true) => {
  const formData = new FormData(e?.currentTarget);
  const payload = Object.fromEntries(formData.entries());
  if (reset) e?.currentTarget.reset();
  return payload as unknown as T;
};

export const getZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const formatDate = (date: Date | string, format = "DD.MM.YYYY"): string => {
  return moment(date).format(format);
};

export const getValidDate = (dateStr: string, format = "DD.MM.YYYY"): Date | null => {
  return moment(dateStr, format, true).isValid() ? moment(dateStr, format).toDate() : null;
};

export const findMonthByOrder = (order: number): IMonth => {
  return months.find(m => m.order === order)!;
};

export const getDateParts = (date: Date = new Date()): IDateParts => {
  return {
    year: date.getFullYear(),
    month: findMonthByOrder(date.getMonth()),
    day: date.getDate(),
    jsDate: date,
  };
};

export const getFilteredMonths = (year: number) => {
  const dateParts = getDateParts();
  const isSameYear = dateParts.year === year;
  const currentYearMonths = months.filter(m => m.order <= dateParts.month.order);
  return isSameYear ? currentYearMonths : months;
};

export const getFilteredDays = (monthOrder: number) => {
  const month = findMonthByOrder(monthOrder);
  const filteredDays = new Array(month.days).fill(0).map((_, i) => i + 1);
  return filteredDays;
};

export const getYears = (count: number = 100) => {
  const dateParts = getDateParts();
  const years = new Array(count + 1).fill(0).map((_, i) => dateParts.year + 1 - (i + 1));
  return years;
};

export const isLeapYear = (year: number, trueValue: number = 366, falseValue: number = 365) => {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  return isLeap ? trueValue : falseValue;
};

export const getYearProgress = (dateStr: string | Date | number = new Date()) => {
  const date = new Date(dateStr);
  const today = getDateParts(date);

  const pastDays = months
    .filter(m => m.order < today.month.order)
    .map(m => (m.linkedWithLeap ? isLeapYear(today.year, 29, m.days) : m.days))
    .reduce((a, b) => a + b, today.day);

  const remainingDays = isLeapYear(today.year) - pastDays;
  return { pastDays, remainingDays, year: today.year, newYear: today.year + 1 };
};

export const calculateDaysLived = (date: Date): number => {
  const currentDateParts = getDateParts();
  const specialDateParts = getDateParts(date);

  const specialDateProgress = getYearProgress(date);
  const currentDateProgress = getYearProgress(currentDateParts.jsDate);

  const diffYears = currentDateParts.year - specialDateParts.year;
  const yearsArray = getYears(diffYears);

  const totalDaysBetweenYears = yearsArray.map(year => isLeapYear(year)).reduce((a, b) => a + b, 0);
  const daysPassed = specialDateProgress.pastDays + (isLeapYear(currentDateParts.year) - currentDateProgress.pastDays);

  return totalDaysBetweenYears - daysPassed;
};
