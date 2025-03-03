import { createStore } from "solid-js/store";
import type { TeacherEntity } from "../../../../domain/entities/teacher";

type MainStore = {
  teachers: TeacherEntity[];
};

const [mainStore, setMainStore] = createStore<MainStore>({
  teachers: [],
});

export { mainStore, setMainStore };
