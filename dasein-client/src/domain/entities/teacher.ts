import type { Entity } from "./entity";
import { newEntityFields } from "./entity";

type Teacher = {
  fullName: string;
  email: string;
};

type TeacherEntity = Entity & Teacher;

const newTeacherEntity = (teacher: Teacher): TeacherEntity => {
  return {
    ...newEntityFields(),
    ...teacher,
  };
};

export type { Teacher, TeacherEntity };
export { newTeacherEntity };
