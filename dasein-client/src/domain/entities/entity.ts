import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  21
);

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
