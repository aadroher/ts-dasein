import type {
  DocumentPayload,
  DeleteDocumentPayload,
} from "@automerge/automerge-repo";
import { Repo } from "@automerge/automerge-repo";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";

const createSyncRepo = ({
  onDocument,
  onDeleteDocument,
  onUnavailableDocument,
}: {
  onDocument: (doc: DocumentPayload) => void;
  onDeleteDocument: (doc: DeleteDocumentPayload) => void;
  onUnavailableDocument: (doc: DeleteDocumentPayload) => void;
}) => {
  const storageAdapter = new IndexedDBStorageAdapter("teacher-db");
  const repo = new Repo({
    storage: storageAdapter,
    network: [new BroadcastChannelNetworkAdapter()],
  });

  repo.on("document", onDocument);
  repo.on("delete-document", onDeleteDocument);
  repo.on("unavailable-document", onUnavailableDocument);

  return repo;
};

export { createSyncRepo };
