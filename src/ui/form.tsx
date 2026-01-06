import { FC, useEffect, useState } from "react";

import * as Utils from "@/helpers/utils";
import { getDate } from "@/helpers/mappers";
import { DateKeys, DateValues, IDate } from "@/helpers/interfaces";

interface FormProps {
  setDate: (data: Date | null) => void;
}

const Form: FC<FormProps> = ({ setDate }) => {
  const [birthDate, setBirthDate] = useState<IDate>(getDate());

  const setBirthDateByKey = (key: DateKeys, value: DateValues) => {
    setBirthDate(prev => ({ ...prev, [key]: value }));
  };

  const years = Utils.getYears();
  const month = Utils.findMonthByOrder(+(birthDate.month ?? 0));
  const filteredDays = Utils.getFilteredDays(month.order);
  const filteredMonths = Utils.getFilteredMonths(birthDate.year!);

  useEffect(() => {
    setBirthDate(prev => ({ ...prev, month: null, day: null }));
  }, [birthDate.year]);

  const handleCalculateLifeDays = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = Utils.parseReactForm<IDate>(e);
    if (!payload.year || !payload.month || !payload.day) return;
    const dateStr = `${Utils.getZero(payload.day!)}.${Utils.getZero(month.order + 1)}.${payload.year}`;
    setDate(Utils.getValidDate(dateStr));
  };

  const selectBase =
    "h-11 w-full appearance-none rounded-md border border-neutral-800 bg-neutral-950/60 px-3 pr-9 text-sm text-neutral-100 " +
    "shadow-sm outline-none transition " +
    "hover:border-neutral-700 hover:bg-neutral-950 " +
    "focus-visible:ring-2 focus-visible:ring-neutral-700 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 " +
    "disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <form onSubmit={handleCalculateLifeDays} className="mx-auto w-full max-w-2xl">
      <h2 className="mb-4 text-center text-xl font-semibold tracking-tight text-neutral-100 sm:text-2xl">
        Bugungacha yashagan kunlaringiz
      </h2>

      <div className="grid gap-3 sm:grid-cols-4 sm:items-end">
        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-xs font-medium text-neutral-400">Yil</label>
          <div className="relative">
            <select
              className={selectBase}
              defaultValue={"selectionYear"}
              value={birthDate.year || "selectionYear"}
              name="year"
              onChange={e => {
                setBirthDateByKey("year", +e.target.value);
              }}
            >
              <option value="selectionYear" disabled hidden>
                yilni tanlang
              </option>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500">▾</span>
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-xs font-medium text-neutral-400">Oy</label>
          <div className="relative">
            <select
              className={selectBase}
              disabled={!birthDate.year}
              name="month"
              defaultValue={"selectionMonth"}
              value={birthDate.month! || "selectionMonth"}
              onChange={e => {
                setBirthDateByKey("month", e.target.value);
              }}
            >
              <option value="selectionMonth" disabled hidden>
                oyni tanlang
              </option>
              {filteredMonths.map(month => (
                <option key={month.order} value={`${month.order}`}>
                  {month.name.uz}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500">▾</span>
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="mb-1.5 block text-xs font-medium text-neutral-400">Sana</label>
          <div className="relative">
            <select
              className={selectBase}
              disabled={!birthDate.month}
              name="day"
              value={birthDate.day || "selectionDay"}
              onChange={e => setBirthDateByKey("day", +e.target.value)}
            >
              <option value="selectionDay" disabled hidden>
                sanani tanlang
              </option>
              {filteredDays.map(date => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500">▾</span>
          </div>
        </div>

        <div className="sm:col-span-1">
          <button
            type="submit"
            disabled={!birthDate.year || !birthDate.month || !birthDate.day}
            className="h-11 w-full rounded-md bg-neutral-100 px-4 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white focus-visible:ring-2 focus-visible:ring-neutral-700 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            hisoblash
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
