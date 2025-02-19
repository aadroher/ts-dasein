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
  return (
    <div class="w-full flex flex-col">
      <div class="flex flex-row flex-nowrap">
        <For each={weekDays}>
          {(day) => (
            <div class="w-24 shrink-0 flex-auto flex flex-row justify-center">
              <div class="justify-self-auto">{day.code}</div>
            </div>
          )}
        </For>
      </div>
      <div>
        <For each={getDayTimeSlots()}>
          {(slot) => (
            <For each={weekDays}>
              {() => <div>{slot.start.toString()}</div>}
            </For>
          )}
        </For>
      </div>
    </div>
  );
};

export { Calendar };
