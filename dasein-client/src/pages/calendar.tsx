import { For } from "solid-js";
import { Temporal } from "temporal-polyfill";
import "./calendar.css";

type WeekDayCode = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type WeekDay = {
  code: WeekDayCode;
  name: string;
  shortName: string;
};

const weekDays: WeekDay[] = [
  { code: "mon", name: "Monday", shortName: "Mon" },
  { code: "tue", name: "Tuesday", shortName: "Tue" },
  { code: "wed", name: "Wednesday", shortName: "Wed" },
  { code: "thu", name: "Thursday", shortName: "Thu" },
  { code: "fri", name: "Friday", shortName: "Fri" },
  // { code: "sat", name: "Saturday", shortName: "Sat" },
  // { code: "sun", name: "Sunday", shortName: "Sun" },
];

type GetDayTimeSlots = (params?: {
  from?: Temporal.PlainTime;
  to?: Temporal.PlainTime;
  slotDuration?: Temporal.Duration;
}) => { start: Temporal.PlainTime; end: Temporal.PlainTime }[];

const getDayTimeSlots: GetDayTimeSlots = ({
  from = Temporal.PlainTime.from({ hour: 0, minute: 0 }),
  to = Temporal.PlainTime.from({ hour: 23, minute: 59 }),
  slotDuration = Temporal.Duration.from({ minutes: 60 }),
} = {}) => {
  const timeDiff = from.until(to);
  const totalMinutes = timeDiff.total({ unit: "minutes" });
  const slotCount = Math.ceil(
    totalMinutes / slotDuration.total({ unit: "minutes" })
  );
  const slotIndexes = Array.from({ length: slotCount }, (_, i) => i);
  return slotIndexes.map((slotIndex) => {
    const start = from.add(
      Temporal.Duration.from({
        minutes: slotIndex * slotDuration.total({ unit: "minutes" }),
      })
    );
    const end = start.add(slotDuration);
    return { start, end };
  });
};

const Calendar = () => {
  const dayTimeSlots = getDayTimeSlots({
    from: Temporal.PlainTime.from({ hour: 8, minute: 0 }),
    to: Temporal.PlainTime.from({ hour: 18, minute: 0 }),
    slotDuration: Temporal.Duration.from({ minutes: 60 }),
  });
  console.log(dayTimeSlots);

  return (
    <div class="mx-auto p-4">
      <ul
        class="w-full grid"
        style={{
          "grid-template-columns": `repeat(${weekDays.length * 2 + 1}, 1fr)`,
          "grid-template-rows": `repeat(${dayTimeSlots.length + 1}, 1fr)`,
        }}
      >
        <li class="w-12 h-8 col-span-1"></li>
        <For each={weekDays}>
          {(day) => (
            <li class="min-w-36 col-span-2 flex items-center justify-center">
              <span>{day.code}</span>
            </li>
          )}
        </For>
        <For each={dayTimeSlots}>
          {(slot, index) => (
            <>
              <li class="min-w-12 h-18 col-span-1 flex items-center justify-end pr-2">
                <span class="text-xs relative top-[-2.25rem]">
                  {index() !== 0
                    ? slot.start.toLocaleString("en-US", {
                        hour: "numeric",
                      })
                    : null}
                </span>
              </li>
              <For each={weekDays}>
                {(day) => (
                  <li class="min-w-36 h-18 col-span-2 border border-dashed"></li>
                )}
              </For>
            </>
          )}
        </For>
      </ul>
    </div>
  );
};

export { Calendar };
