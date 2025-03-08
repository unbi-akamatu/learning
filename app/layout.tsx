"use client"; // ✅ クライアントコンポーネントとして明示

import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim() === "") return;
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}>
        <header className="h-16 px-6 border-b flex items-center">
          <Button asChild variant="ghost">
            <Link href="/">un bijour - shiruME</Link>
          </Button>
          <span className="flex-1" />
          <form className="flex gap-2" onSubmit={handleSearch}>
            <Input autoComplete="off" name="search" className="flex-1" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <Button type="submit" size="icon">
              <Search size={20} />
            </Button>
          </form>
        </header>
        <main className="py-10 container">{children}</main>
        <footer className="h-16 px-6 border-t flex items-center sticky top-full text-sm">&copy; 2024 un bijour - shiruME</footer>
      </body>
    </html>
  );
}
