// import "server-only";
import { createClient } from "newt-client-js";
import { cache } from "react";
import type { Article } from "@/types/article";
import type { News } from "@/types/news";
import type { Category } from "@/types/category";

export const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + "",
  token: process.env.NEWT_CDN_API_TOKEN + "",
  apiType: "cdn",
});

export const getArticles = cache(async () => {
  const { items } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      select: ["_id", "title", "slug", "body", "_sys.createdAt", "_sys.updatedAt", "coverImage", "categories"],
    },
  });
  return items;
});

export const getArticleBySlug = cache(async (slug: string) => {
  const article = await client.getFirstContent<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      slug,
      select: ["_id", "title", "slug", "body"],
    },
  });
  return article;
});

export const getNewses = cache(async () => {
  const { items } = await client.getContents<News>({
    appUid: "blog",
    modelUid: "news",
    query: {
      select: ["_id", "title", "slug", "body", "_sys.createdAt", "_sys.updatedAt", "date"],
    },
  });
  return items;
});

export const searchArticles = cache(async (keyword: string) => {
  const { items } = await client.getContents<Article>({
    appUid: "blog",
    modelUid: "article",
    query: {
      title: {
        match: keyword,
      },
      select: ["_id", "title", "slug", "body", "_sys.createdAt", "_sys.updatedAt", "coverImage"],
    },
  });
  return items;
});

export const getCategories = cache(async () => {
  const { items } = await client.getContents<Category>({
    appUid: "blog",
    modelUid: "category",
    query: {
      select: ["_id", "name", "slug"],
    },
  });
  console.log(items);
  return items;
});

export const getArticlesByCategory = cache(async (category: string): Promise<Article[]> => {
  try {
    const { items } = await client.getContents<Article>({
      appUid: "blog",
      modelUid: "article",
      query: {
        categories: {
          in: [category],
        },
      },
    });
    return items;
  } catch (error) {
    console.error("記事一覧の取得中にエラーが発生しました:", error);
    throw new Error("記事一覧の取得に失敗しました");
  }
});
