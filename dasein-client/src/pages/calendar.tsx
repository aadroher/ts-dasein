import { For } from "solid-js";
import { Temporal } from "temporal-polyfill";

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
  const slotIndexes = Array.from({ length: 24 * 4 }, (_, i) => i);
  const initialSlot = Temporal.PlainTime.from({ hour: 0, minute: 0 });
  const slotDuration = Temporal.Duration.from({ minutes: 15 });
  return slotIndexes.map((slotIndex) => {
    const start = initialSlot.add(
      Temporal.Duration.from({ minutes: slotIndex * 15 })
    );
    const end = start.add(slotDuration);
    return { start, end };
  });
};

const Calendar = () => {
  return (
    <div>
      <div>
        <For each={weekDays}>{(day) => <div>{day.name}</div>}</For>
      </div>
      <div>
        <For each={getDayTimeSlots()}>
          {(slot) => <div>{slot.start.toString()}</div>}
        </For>
      </div>
    </div>
  );
};

export { Calendar };
