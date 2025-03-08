import { notFound } from "next/navigation"; // ✅ `notFound()` をインポート
import Link from "next/link";
import { getArticles, getCategories } from "@/lib/newt";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { category: string };
}

// ✅ Next.js に静的ページのみを使用するよう指示
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategories();

  console.log(
    "🟢 取得したカテゴリ一覧:",
    categories.map((cat) => cat._id)
  ); // デバッグ用ログ

  if (!categories || categories.length === 0) {
    console.error("⚠️ カテゴリが取得できませんでした");
    return [];
  }

  const staticParams = categories.map((category) => ({
    params: { category: category._id.toString() }, // ✅ 明示的に `string` に変換
  }));

  console.log("🟢 生成する静的ページ（最終確認）:", JSON.stringify(staticParams, null, 2)); // 🚀 明示的にログ出力

  return staticParams;
}

export default async function CategoryPage({ params }: PageProps) {
  console.log("🟢 params:", params); // ✅ デバッグログ

  // ✅ `params` が undefined の場合は 404 にする
  if (!params || !params.category) {
    console.error("❌ params が取得できませんでした:", params);
    return notFound();
  }

  const { category } = params;

  const categories = await getCategories();
  const articles = await getArticles();

  // ✅ `category` に対応するカテゴリが存在しない場合は 404 にする
  const currentCategory = categories.find((cat) => cat._id === category);
  if (!currentCategory) {
    console.error("❌ 現在のカテゴリが見つかりません:", category);
    return notFound();
  }

  const categoryName = currentCategory.name;

  const filteredArticles = articles.filter((article) => {
    if (!article.categories) return false;

    if (Array.isArray(article.categories)) {
      return article.categories.some((cat) => cat._id === category);
    } else if (typeof article.categories === "object" && article.categories._id) {
      return article.categories._id === category;
    }

    return false;
  });

  return (
    <div className="px-6">
      <section>
        <h1 className="font-bold text-3xl mb-6">{categoryName} の記事一覧</h1>
        {filteredArticles.length > 0 ? (
          <ul className="grid gap-6 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <li key={article._id} className="rounded-lg relative border p-4 hover:bg-accent">
                <div className="aspect-video border rounded-lg relative bg-muted mb-4 overflow-hidden">
                  <Image alt="" src={article.coverImage} fill className="object-cover object-center" />
                </div>
                <h3>
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                    <span className="absolute inset-0" />
                  </Link>
                </h3>
                <time className="text-sm text-muted-foreground">{format(new Date(article._sys.createdAt), "yyyy年MM月dd日")}</time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">このカテゴリには記事がありません。</p>
        )}
      </section>
      <section className="py-10">
        <h2 className="mb-6 font-bold text-3xl">他のカテゴリー</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat._id}>
              <Button asChild variant="ghost">
                <Link href={`/category/${cat._id}`}>{cat.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
