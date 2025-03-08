import { getArticles, getArticleBySlug } from "@/lib/newt";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

// ✅ Next.js に静的ページをエクスポートするよう指示
export async function generateStaticParams() {
  const articles = await getArticles();

  console.log(
    "🟢 取得した記事一覧:",
    articles.map((article) => article.slug)
  ); // デバッグ用ログ

  if (!articles || articles.length === 0) {
    console.error("⚠️ 記事が取得できませんでした");
    return [];
  }

  const staticParams = articles.map((article) => ({
    slug: article.slug, // ✅ 明示的に `string` に変換
  }));

  console.log("🟢 生成する静的ページ:", JSON.stringify(staticParams, null, 2)); // 🚀 明示的にログ出力

  return staticParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  return {
    title: article?.title || "記事が見つかりません",
    description: "投稿詳細ページです",
  };
}

export default async function ArticlePage({ params }: PageProps) {
  console.log("🟢 params:", params); // ✅ デバッグ用ログ

  if (!params || !params.slug) {
    console.error("❌ params が取得できませんでした:", params);
    return notFound();
  }

  const article = await getArticleBySlug(params.slug);
  if (!article) {
    console.error("❌ 記事が見つかりません:", params.slug);
    return notFound();
  }

  return (
    <article>
      <div className="prose container">
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </article>
  );
}
