import { A } from "@solidjs/router";
import { repositories } from "../../../../../domain/state/state";

const ListTeachers = () => {
  return (
    <div class="w-xl mx-auto flex flex-col gap-4">
      <h1 class="text-2xl font-bold">List Teachers</h1>
      <ol class="flex flex-col gap-4">
        {repositories.teachers.list().map((teacher) => (
          <li>
            <dl>
              <dt>Full Name</dt>
              <dd>{teacher.fullName}</dd>
              <dt>Email</dt>
              <dd>{teacher.email}</dd>
            </dl>
            <button
              onClick={() => repositories.teachers.remove({ id: teacher.id })}
              class="bg-red-900 text-white p-2 rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
      <A href="/teachers/new">New Teacher</A>
    </div>
  );
};

export { ListTeachers };
