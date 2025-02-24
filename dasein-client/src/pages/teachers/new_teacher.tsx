import { createSignal, createEffect } from "solid-js";
import { mainStore, setMainStore } from "../../stores/main";
import type { Teacher } from "../../domain/entities/teacher";

const [teacher, setTeacher] = createSignal<Teacher | null>(null);

const NewTeacher = () => {
  createEffect(() => {
    console.log(teacher());
  });

  return (
    <div class="w-xl mx-auto flex flex-col gap-4">
      <h1 class="text-2xl font-bold">New Teacher</h1>
      <form class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="fullName">Full Name</label>
          <input
            class="border border-gray-300 rounded-md p-2"
            type="text"
            id="fullName"
            value={teacher()?.fullName ?? null}
            onInput={(e) => {
              setTeacher({
                ...teacher(),
                fullName: e.target.value,
              });
            }}
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <input
            class="border border-gray-300 rounded-md p-2"
            type="email"
            id="email"
            value={teacher()?.email ?? null}
            onInput={(e) => {
              setTeacher({
                ...teacher(),
                email: e.target.value,
              });
            }}
          />
        </div>
      </form>
    </div>
  );
};

export { NewTeacher };
