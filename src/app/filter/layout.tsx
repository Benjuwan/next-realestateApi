import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "検索 | 不動産取引データ取得機能",
  description: "filter（検索）機能で「日本各地の不動産取引データ」を確認できます"
};

export default function FilterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <section>{children}</section>
    </main>
  );
}
