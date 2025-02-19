import { For } from "solid-js";

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

const dayTimeSlots = () => {
  const slots = Array.from({ length: 24 * 4 }, (_, i) => i);
  return slots.map((slot) => ({
    code: slot,
    name: `${slot}:00`,
  }));
};

const Calendar = () => {
  return <For each={weekDays}>{(day) => <div>{day.name}</div>}</For>;
};

export { Calendar };
