import '../styles/globals.css';
import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareSortGraphActionFragment } from '@/providers/compare/CompareSortGraphActionFragment';
import { CityNameFragment } from '@/providers/filter/CityNameFragment';
import { GetFetchDataContextFragment } from '@/providers/filter/GetFetchDataFragment';
import { GetFetchEachCodeFragment } from '@/providers/filter/GetFetchEachCodeFragment';
import Header from '@/components/layout/header/Header';
import Loading from "./loading";

export const metadata: Metadata = {
  title: "不動産取引データ取得機能",
  description: "ここでは「日本各地の不動産取引データ」を確認できます。pager（ページ送り）、 filiter（検索）、compare（比較）ドロップダウンリストから取得後の表示仕様・機能を選んでください。"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>
        <GetFetchDataContextFragment>
          <CityNameFragment>
            <GetFetchEachCodeFragment>
              <CompareSortGraphActionFragment>
                <Header />
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </CompareSortGraphActionFragment>
            </GetFetchEachCodeFragment>
          </CityNameFragment>
        </GetFetchDataContextFragment>
      </body>
    </html>
  );
}
