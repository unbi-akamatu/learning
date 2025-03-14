// /app/newses/[slug]/page.tsx

import { getNewsBySlug, getNewses } from "@/lib/newt";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

// ISR 用に静的パスを生成する
export async function generateStaticParams() {
  const newses = await getNewses();
  return newses.map((news) => ({
    slug: news.slug,
  }));
}

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const news = await getNewsBySlug(params.slug);
  if (!news) return notFound();

  return (
    <article className="px-6 py-10">
      <h1 className="font-bold text-3xl mb-6">{news.title}</h1>
      <time className="text-sm text-muted-foreground">{format(new Date(news._sys.createdAt), "yyyy年MM月dd日")}</time>
      <div className="prose my-6" dangerouslySetInnerHTML={{ __html: news.body }} />
      <Link href="/" className="text-blue-500 underline">
        トップに戻る
      </Link>
    </article>
  );
}
