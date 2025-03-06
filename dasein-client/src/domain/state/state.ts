import type {
  DocumentPayload,
  DeleteDocumentPayload,
  AnyDocumentId,
} from "@automerge/automerge-repo";
import type { Entity } from "../entities/entity";
import type { TeacherEntity, Teacher } from "../entities/teacher";

import { createStore } from "solid-js/store";

import { Repo } from "@automerge/automerge-repo";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { MessageChannelNetworkAdapter } from "@automerge/automerge-repo-network-messagechannel";
import { newTeacherEntity } from "../entities/teacher";

type Automergeable = {
  automergeId: AnyDocumentId | null;
};

type Collection<T extends Entity> = {
  name: string;
  items: T[];
};

type AutomergeableCollection<T extends Entity> = Collection<T> & Automergeable;

type State = {
  collections: AutomergeableCollection<Entity>[];
};

type Repository<T extends Entity> = {
  add: (item: Omit<T, keyof Entity>) => Promise<void>;
  remove: ({ id }: { id: string }) => Promise<T | void>;
  find: ({ id }: { id: string }) => T | void;
  list: () => T[];
};

type Repositories = Record<string, Repository<Entity>>;

const createRepositories = (): Repositories => {
  console.log("🚨 Creating repositories");
  const [store, setStore] = createStore<State>({
    collections: [
      {
        automergeId: null,
        name: "teachers",
        items: [],
      } as AutomergeableCollection<TeacherEntity>,
    ],
  });

  const storageAdapter = new IndexedDBStorageAdapter("teacher-db");
  const networkAdapter = new BroadcastChannelNetworkAdapter({
    channelName: "dasein-main",
  });
  const automergeRepository = new Repo({
    storage: storageAdapter,
    network: [networkAdapter],
  });

  automergeRepository.on("document", async (event) => {
    console.log("🚨 New document event received");
    console.log("Event: ", event);
    const automergeDocumentId = event.handle.documentId;
    const automergeCollectionDocument = await event.handle.doc();
    console.log("Document: ", automergeCollectionDocument);
    const collection = store.collections.find(
      (collection) => collection.automergeId === automergeDocumentId
    );
    if (!collection) {
      throw new Error("Collection not found");
    }
    const newCollectionItems = [
      ...collection.items,
      automergeCollectionDocument,
    ];
    setStore(
      "collections",
      (collection) => collection.automergeId === automergeDocumentId,
      "items",
      newCollectionItems
    );
  });

  // automergeRepository.on("delete-document", (event) => {
  //   console.log("🚨 Delete document event received");
  //   console.log("Event: ", event);
  //   const documentId = event.documentId;
  //   setStore({
  //     teachers: store.teachers.filter(
  //       (teacher) => teacher.automergeId !== documentId
  //     ),
  //   });
  // });

  // automergeRepository.on("unavailable-document", (event) => {
  //   console.log("🚨 Unavailable document event received");
  //   console.log("Event: ", event);
  // });

  return [
    {
      add: async (item) => {
        const teacherEntity = newTeacherEntity(item);
        automergeRepository.create(teacherEntity);
      },
      remove: async ({ id }) => {
        console.log("🚨 Remove teacher", id);

        const teacher = store.teachers.find((teacher) => teacher.id === id);
        if (teacher?.automergeId) {
          automergeRepository.delete(teacher.automergeId);
        }
      },
      find: ({ id }) => {
        return store.teachers.find((teacher) => teacher.id === id);
      },
      list: () => {
        return store.teachers;
      },
    },
  ];
};

const repositories = createRepositories();

export { createRepositories, repositories };
