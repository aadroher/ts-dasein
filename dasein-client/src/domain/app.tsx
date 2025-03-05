import type { JSX } from "solid-js/jsx-runtime";
import type { TeacherEntity } from "./entities/teacher";
import { createSyncRepo } from "../infrastructure/sync/sync_repo";
import {
  mainStore,
  setMainStore,
} from "../infrastructure/ui/state/stores/main";
import { Router } from "@solidjs/router";
import { routes } from "../infrastructure/ui/view/routes";
import Layout from "../infrastructure/ui/view/layout";

type TeacherRepo = {
  add: ({ teacher }: { teacher: TeacherEntity }) => Promise<void>;
  remove: ({ teacher }: { teacher: TeacherEntity }) => Promise<void>;
  find: ({ id }: { id: string }) => Promise<TeacherEntity | undefined>;
  findAll: () => Promise<TeacherEntity[]>;
};

type TeacherUiState = TeacherRepo;
type TeacherStore = TeacherRepo;

const createApp = () => {
  const repo = createSyncRepo({
    onDocument: async (doc) => {
      const document = await doc.handle.doc();
      setMainStore({
        ...mainStore,
        teachers: [...mainStore.teachers, document],
      });
    },
    onDeleteDocument: (doc) => {
      console.log("onDeleteDocument called", doc);
    },
    onUnavailableDocument: (doc) => {
      console.log("onUnavailableDocument called", doc);
    },
  });

  return {
    renderSink: () => <Router root={Layout}>{routes}</Router>,
  };
};

export { createApp };
