import { mainStore } from "../../stores/main";
import { A } from "@solidjs/router";

const ListTeachers = () => {
  return (
    <div class="w-xl mx-auto flex flex-col gap-4">
      <h1 class="text-2xl font-bold">List Teachers</h1>
      <ol class="flex flex-col gap-4">
        {mainStore.teachers.map((teacher) => (
          <li>
            <dl>
              <dt>Full Name</dt>
              <dd>{teacher.fullName}</dd>
              <dt>Email</dt>
              <dd>{teacher.email}</dd>
            </dl>
          </li>
        ))}
      </ol>
      <A href="/teachers/new">New Teacher</A>
    </div>
  );
};

export { ListTeachers };
