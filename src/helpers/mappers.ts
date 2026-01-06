import { get } from "lodash";
import { IDate } from "./interfaces";

export const getDate = (date?: unknown): IDate => {
  return {
    year: get(date, "year", null),
    month: get(date, "month", null),
    day: get(date, "day", null),
  };
};
