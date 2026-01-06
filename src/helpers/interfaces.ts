export type MultiLangType = Record<"uz" | "en", string>;

export interface IMonth {
  order: number;
  name: MultiLangType;
  linkedWithLeap: boolean;
  days: number;
}

export interface IDateParts {
  year: number;
  month: IMonth;
  day: number;
  jsDate: Date;
}

export interface IDate {
  year: number | null;
  month: string | null;
  day: number | null;
}

export type DateKeys = keyof IDate;
export type DateValues = IDate[DateKeys];

// eslint-disable-next-line
export type DocumentData = Record<string, any>;
