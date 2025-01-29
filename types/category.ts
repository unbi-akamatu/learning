import type { Content } from "newt-client-js";

export type Category = {
  _id: string;
  name: string;
  slug: string;
} & Content;
