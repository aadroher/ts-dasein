import type {
  DocumentPayload,
  DeleteDocumentPayload,
} from "@automerge/automerge-repo";
import type { Entity } from "../entities/entity";
import type { TeacherEntity, Teacher } from "../entities/teacher";

import { createStore } from "solid-js/store";

import { Repo } from "@automerge/automerge-repo";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { newTeacherEntity } from "../entities/teacher";

type State = {
  teachers: TeacherEntity[];
};

type Repository<T extends Entity> = {
  add: (item: Omit<T, keyof Entity>) => Promise<void>;
  remove: ({ id }: { id: string }) => Promise<T | void>;
  find: ({ id }: { id: string }) => T | void;
  list: () => T[];
};

type Repositories = {
  teachers: Repository<TeacherEntity>;
};

const createRepositories = (): Repositories => {
  const [store, setStore] = createStore<State>({
    teachers: [],
  });

  const storageAdapter = new IndexedDBStorageAdapter("teacher-db");
  const networkAdapter = new BroadcastChannelNetworkAdapter();
  const repo = new Repo({
    storage: storageAdapter,
    network: [networkAdapter],
  });

  repo.on("document", async (event) => {
    console.log("🚨 New document event received");
    console.log("Event: ", event);
    const document = await event.handle.doc();
    console.log("Document: ", document);
    setStore({
      teachers: [...store.teachers, document],
    });
  });

  repo.on("delete-document", (event) => {
    console.log("🚨 Delete document event received");
    console.log("Event: ", event);
  });

  repo.on("unavailable-document", (event) => {
    console.log("🚨 Unavailable document event received");
    console.log("Event: ", event);
  });

  return {
    teachers: {
      add: async (item) => {
        const teacherEntity = newTeacherEntity(item);
        repo.create(teacherEntity);
      },
      remove: async ({ id }) => {},
      find: ({ id }) => {
        return store.teachers.find((teacher) => teacher.id === id);
      },
      list: () => {
        return store.teachers;
      },
    },
  };
};

const repositories = createRepositories();

export { createRepositories, repositories };
