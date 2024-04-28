import type { Metadata } from "next";
import { CompareSortGraphActionFragment } from "./providers/compare/CompareSortGraphAction";
import { CityNameFragment } from "./providers/filter/CityName";
import { GetFetchDataContextFragment } from "./providers/filter/GetFetchData";
import { GetFetchPrefCodeFragment } from "./providers/filter/GetFetchPrefCode";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <GetFetchDataContextFragment>
          <CityNameFragment>
            <GetFetchPrefCodeFragment>
              <CompareSortGraphActionFragment>
                {children}
              </CompareSortGraphActionFragment>
            </GetFetchPrefCodeFragment>
          </CityNameFragment>
        </GetFetchDataContextFragment>
      </body>
    </html>
  );
}
