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
    <div>
      <table>
        <thead>
          <tr>
            <For each={weekDays}>
              {(day) => <th scope="col">{day.code}</th>}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={getDayTimeSlots()}>
            {(slot) => (
              <tr>
                <For each={weekDays}>
                  {() => <td>{slot.start.toString()}</td>}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <div class="grid"></div>
    </div>
  );
};

export { Calendar };
