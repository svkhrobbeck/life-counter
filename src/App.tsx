import { useState } from "react";
import { calculateDaysLived, getYearProgress } from "./helpers/utils";
import { Footer, Form } from "./components";

const App = () => {
  const [date, setDate] = useState<Date | null>(null);
  const { year, pastDays, remainingDays } = getYearProgress();

  return (
    <>
      {/* Background texture */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="mx-auto max-w-3xl text-xl leading-[1.8] font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Bugun{" "}
            <span className="rounded-md border text-nowrap border-neutral-800 bg-neutral-900/60 px-2 py-0.5">
              {year}-yil
            </span>{" "}
            ning{" "}
            <span className="rounded-md border text-nowrap border-neutral-800 bg-neutral-900/60 px-2 py-0.5">
              {pastDays}-kuni
            </span>
          </h2>

          <p className="mt-3 text-sm text-neutral-400 sm:text-base">
            (yangi yilgacha <span className="text-neutral-200 font-medium">{remainingDays}</span> kun qoldi)
          </p>
        </div>

        {/* Main card */}
        <section
          className="relative rounded-2xl border border-neutral-800/80 bg-neutral-950/40 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_80px_rgba(0,0,0,0.55)]
                     backdrop-blur sm:p-6"
        >
          {/* subtle top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <Form {...{ setDate }} />

          {date && (
            <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 sm:p-5">
              <p className="text-center text-base font-medium text-neutral-200 sm:text-lg">
                Siz <span className="font-semibold text-neutral-50">{calculateDaysLived(date)}</span> kundan buyon
                yashab kelyapsiz
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default App;
