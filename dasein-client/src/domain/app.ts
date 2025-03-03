import type { TeacherEntity } from "./entities/teacher";

type TeacherRepo = {
  add: ({ teacher }: { teacher: TeacherEntity }) => Promise<void>;
  remove: ({ teacher }: { teacher: TeacherEntity }) => Promise<void>;
  find: ({ id }: { id: string }) => Promise<TeacherEntity | undefined>;
  findAll: () => Promise<TeacherEntity[]>;
};

type TeacherUiState = TeacherRepo;
type TeacherStore = TeacherRepo;

type App<T> = ({
  uiState,
  store,
}: {
  uiState: TeacherUiState;
  store: TeacherStore;
}) => {
  renderSink: T;
};
