import { getArticles, getArticleBySlug } from "@/lib/newt";
import styles from "@/app/page.module.css";
import type { Metadata } from "next";
import type { Article } from "@/types/article";

// ✅ `PageProps` を手動で定義
interface PageProps {
  params: { slug: string };
}

// ✅ `generateStaticParams` は `Promise` を返す
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const articles: Article[] = await getArticles();
  return articles.map((article: Article) => ({
    slug: article.slug,
  }));
}

// ✅ `dynamicParams` を明示的に設定
export const dynamicParams = false;

// ✅ `params` を適切に型付け
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article: Article | null = await getArticleBySlug(params.slug);
  return {
    title: article?.title || "記事が見つかりません",
    description: "投稿詳細ページです",
  };
}

// ✅ `React.FC` を適用し、関数コンポーネントとして扱う
const ArticlePage: React.FC<PageProps> = async ({ params }) => {
  console.log("params:", params); // ✅ デバッグ用
  const article = await getArticleBySlug(params.slug);
  if (!article) return <div>記事が見つかりません</div>;

  return (
    <article className={styles.main}>
      <div className="prose container">
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </article>
  );
};

export default ArticlePage;
