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
    <div class="w-full flex flex-col">
      <div class="flex flex-row flex-nowrap">
        <div class="w-16 shrink-0 flex flex-row justify-center"></div>
        <For each={weekDays}>
          {(day) => (
            <div class="min-w-16 max-w-48 shrink-0 flex-auto flex flex-row justify-center border-l">
              <div class="px-4 py-2">{day.code}</div>
            </div>
          )}
        </For>
      </div>
      <div class="flex flex-row border-y">
        <div class="w-16 flex flex-column flex-wrap justify-center">
          <For each={dayTimeSlots}>
            {(slot) => (
              <div class="w-14 h-12 flex flex-column justify-center text-xs relative">
                <span class="relative bottom-[-12px]">
                  {slot.end.toLocaleString("en-US", {
                    hour: "numeric",
                  })}
                </span>
              </div>
            )}
          </For>
        </div>

        {/* <For each={weekDays}>
          {() => (
            <div class="min-w-16 max-w-48 flex flex-column justify-center">
              <For each={dayTimeSlots}>
                {(slot) => <div>{slot.start.toString()}</div>}
              </For>
            </div>
          )}
        </For> */}
      </div>
    </div>
  );
};

export { Calendar };
