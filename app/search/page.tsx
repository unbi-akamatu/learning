import Link from "next/link";
import { searchArticles } from "@/lib/newt";
import { format } from "date-fns";
import Image from "next/image";

export default async function Page({
  searchParams: { q },
}: {
  searchParams: {
    q: string;
  };
}) {
  const articles = await searchArticles(q);

  return (
    <div className="max-w-lg py-10">
      <h1>検索結果</h1>
      <ul className="grid grid-cols-3 gap-6">
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
              <time className="text-sm text-muted-foreground">{format(new Date(article._sys.createdAt), "yyyy年MM月dd日")}</time>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
