import { type } from "os";

export type OutlineNode = {
  body: string;
  indentation: number;
  selected?: boolean;
  collapsed?: boolean;
};
