// "use client";
import Link from "next/link";
import { getArticles, getCategories, getNewses } from "@/lib/newt";
import styles from "@/app/page.module.css";
import type { Metadata } from "next";
import { format } from "date-fns";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "un bijour-shiruME ブログ",
  description: "NewtとNext.jsを利用したブログです",
};

export default async function Home() {
  const newses = await getNewses();
  const articles = await getArticles();
  const categories = await getCategories();

  return (
    <div className="px-6">
      <section>
        <h2 className="font-bold text-3xl mb-6">お知らせ</h2>
        <ul className="space-y-2">
          {newses.map((news) => {
            return (
              <li key={news._id} className="rounded-lg relative border p-4 hover:bg-accent">
                <h3>
                  <Link href={`newses/${news.slug}`}>
                    {news.title}
                    <span className="absolute inset-0" />
                  </Link>
                </h3>
                <time className="text-sm text-muted-foreground">{format(new Date(news._sys.createdAt), "yyyy年MM月dd日")}</time>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="py-10">
        <h2 className="font-bold text-3xl mb-6">blog</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <ul className="grid lg:grid-cols-3 gap-6 col-span-2">
            {articles.map((article) => {
              return (
                <li key={article._id} className="rounded-lg relative border p-4 hover:bg-accent">
                  <div className="aspect-video border rounded-lg relative bg-muted mb-4 overflow-hidden">
                    <Image alt="" src={article.coverImage} fill className="object-cover object-center" />
                  </div>
                  <h3>
                    <Link href={`articles/${article.slug}`}>
                      {article.title}
                      <span className="absolute inset-0" />
                    </Link>
                  </h3>
                  <div key={article._id}>
                    {article.categories ? (
                      <Button key={article.categories._id} className="text-sm">
                        {article.categories.name}
                      </Button>
                    ) : (
                      <p>カテゴリがありません</p>
                    )}
                  </div>

                  <time className="text-sm text-muted-foreground">{format(new Date(article._sys.createdAt), "yyyy年MM月dd日")}</time>
                </li>
              );
            })}
          </ul>

          <div>
            <h2 className="mb-6 font-bold text-3xl">カテゴリー一覧</h2>
            <ul>
              {categories.map((category) => (
                <li key={category._id}>
                  <Button asChild variant="ghost">
                    <Link href={`/category/${category._id}`}>{category.name}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="py-10">
        <h2 className="mb-6 font-bold text-3xl">お問い合わせ</h2>
        <form method="post" action="https://unbijour-shirume.form.newt.so/v1/QqAGyvnY-">
          <Input type="text" name="Full name" />
          <Button type="submit">Submit</Button>
        </form>
      </section>
    </div>
  );
}
