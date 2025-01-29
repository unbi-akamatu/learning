import Link from "next/link";
import { getArticles, getCategories } from "@/lib/newt";
import styles from "@/app/page.module.css";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await Promise.resolve(params);
  // 全カテゴリを取得
  const categories = await getCategories();
  const articles = await getArticles();

  // 現在のカテゴリIDに対応するカテゴリ名を取得
  const currentCategory = categories.find((cat) => cat._id === category);
  const categoryName = currentCategory?.name || "不明なカテゴリ";

  // 全記事を取得して、現在のカテゴリIDに該当する記事のみをフィルタリング
  const filteredArticles = articles.filter((article) => {
    console.log("Categories:", article.categories); // ここでデバッグ出力
    if (!article.categories) return false;

    // カテゴリがオブジェクトの場合
    if (Array.isArray(article.categories)) {
      return article.categories.some((cat) => cat._id === category);
    } else if (typeof article.categories === "object" && article.categories._id) {
      return article.categories._id === category;
    }

    return false; // その他の型は除外
  });

  // article.categories?.includes(params.category));

  return (
    <div className="px-6">
      <section>
        <h1 className="font-bold text-3xl mb-6">{categoryName}の記事一覧</h1>
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
          {categories.map((category) => (
            <li key={category._id}>
              <Button asChild variant="ghost">
                <Link href={`/category/${category._id}`}>{category.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
