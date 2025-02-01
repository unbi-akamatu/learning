import { getArticles, getArticleBySlug } from "@/lib/newt";
import styles from "@/app/page.module.css";
import type { Metadata } from "next";
import type { Article } from "@/types/article";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article: Article | null = await getArticleBySlug(params.slug);
  return {
    title: article?.title || "記事が見つかりません",
    description: "投稿詳細ページです",
  };
}

export default async function ArticlePage({ params }: PageProps) {
  console.log("params:", params);
  const article: Article | null = await getArticleBySlug(params.slug);
  if (!article) return <div>記事が見つかりません</div>;

  return (
    <article className={styles.main}>
      <div className="prose container">
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </article>
  );
}
