import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ページ送り | 不動産取引データ取得機能",
  description: "pager（ページ送り）機能で「日本各地の不動産取引データ」を確認できます"
};

export default function PagerLayout({
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
