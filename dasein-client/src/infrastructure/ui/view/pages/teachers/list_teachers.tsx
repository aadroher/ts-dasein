import { Repo } from "@automerge/automerge-repo";
import { mainStore, setMainStore } from "../../../state/stores/main";
import { A } from "@solidjs/router";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { newTeacherEntity } from "../../../../../domain/entities/teacher";
const storageAdapter = new IndexedDBStorageAdapter("teacher-db");
const repo = new Repo({
  storage: storageAdapter,
  network: [new BroadcastChannelNetworkAdapter()],
});

console.log("handles outside", repo.handles);

repo.on("document", async (doc) => {
  console.log("Document", doc);
  console.log(doc.handle.isReady());
  const document = await doc.handle.doc();
  setMainStore({
    ...mainStore,
    teachers: [
      ...mainStore.teachers,
      newTeacherEntity({
        fullName: document.fullName,
        email: document.email,
      }),
    ],
  });
});

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
