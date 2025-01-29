import { Category } from "./category";
import type { Content } from "newt-client-js";

export type Article = {
  _id: string;
  title: string;
  slug: string;
  body: string;
  coverImage: string;
  categories: Category; // ここを配列ではなくオブジェクトに変更
} & Content;
