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
  { code: "sat", name: "Saturday", shortName: "Sat" },
  { code: "sun", name: "Sunday", shortName: "Sun" },
];

const getDayTimeSlots = () => {
  const slotIndexes = Array.from({ length: 24 }, (_, i) => i);
  const initialSlot = Temporal.PlainTime.from({ hour: 0, minute: 0 });
  const slotDuration = Temporal.Duration.from({ minutes: 60 });
  return slotIndexes.map((slotIndex) => {
    const start = initialSlot.add(
      Temporal.Duration.from({ minutes: slotIndex * 60 })
    );
    const end = start.add(slotDuration);
    return { start, end };
  });
};

const Calendar = () => {
  const dayTimeSlots = getDayTimeSlots();
  return (
    <div class="max-w-screen-lg mx-auto p-4">
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
              <li class="min-w-12 h-12 col-span-1 flex items-center justify-end pr-2">
                <span class="text-xs relative top-[-1.5rem]">
                  {index() !== 0
                    ? slot.start.toLocaleString("en-US", {
                        hour: "numeric",
                      })
                    : null}
                </span>
              </li>
              <For each={weekDays}>
                {(day) => (
                  <li class="min-w-36 h-12 col-span-2 border border-dashed"></li>
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
