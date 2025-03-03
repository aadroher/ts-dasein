import { nanoid } from "nanoid";

type Entity = {
  id: string;
  isArchived: boolean;
};

const newEntityFields = (): Entity => {
  return {
    id: nanoid(),
    isArchived: false,
  };
};

export type { Entity };
export { newEntityFields };
