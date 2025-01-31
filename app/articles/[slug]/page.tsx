import { getArticles, getArticleBySlug } from "@/lib/newt";
import styles from "@/app/page.module.css";
import type { Metadata } from "next";
import type { Article } from "@/types/article";

type Params = { slug: string };

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata | undefined> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return {
    title: article?.title || "記事が見つかりません",
    description: "投稿詳細ページです",
  };
}

export default async function Article({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return null;

  return (
    <article className={styles.main}>
      <div className="prose container">
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </article>
  );
}
