# Next.js-realEstateApi

[https://github.com/Benjuwan/realEstateApi](https://github.com/Benjuwan/realEstateApi)で制作した`React`app の`Next.js`ver（※使用していたAPIの廃止に伴って`Next.js`で新規作成）

## 概要
日本各地の不動産取引データを取得するサイトです。国交省の「[不動産情報ライブラリ](https://www.reinfolib.mlit.go.jp/)」ページのAPIを使ってデータを取得しています。

- 公開サイト：[https://next-realestate-api.vercel.app/](https://next-realestate-api.vercel.app/)

## ToFix
- 本番環境では一切問題ないが開発（`npm run dev`）環境では下記コンポーネントにて**挙動に影響を及ぼさないエラーが発生**する
  - `CompareSortListsViewGraph.tsx`（src\app\compare\utils\CompareSortListsViewGraph.tsx）<br />
  グラフ表示を行う際にログにエラーが出る（`recharts`で使用している`XAxis`に対するエラー）

## 技術スタック
- types/node@20.12.7
- @types/react-dom@18.2.25
- @types/react@18.2.79
- eslint-config-next@14.2.3
- eslint@8.57.0
- next@14.2.3
- react-dom@18.2.0
- react@18.2.0
- recharts@2.12.6
- styled-components@6.1.8（※`next.config.mjs`にコンパイルに必要な設定を記述している）
- typescript@5.4.5

- 不動産取引価格情報
  - ~~[土地総合情報システム](https://www.land.mlit.go.jp/webland/api.html)~~
  - [不動産情報ライブラリ](https://www.reinfolib.mlit.go.jp/)

## 仕様
- `.env.local`にてAPIKEYを管理
- サーバーアクション呼び出し箇所（クライアントコンポーネント）
  - `SelectEls.tsx`（src\app\components\elements\SelectEls.tsx）
  - `SelectPrefCities.tsx`（src\app\components\elements\SelectPrefCities.tsx）
  - `AppStartBtn.tsx`（src\app\compare\utils\AppStartBtn.tsx）

## 参考情報
- [サーバーアクション](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [【Next】環境変数のプレフィックス、NEXT_PUBLICの使い分け](https://zenn.dev/kibe/articles/7c09742400aa66)
  - 要約：`NEXT_PUBLIC_`プレフィックスを付けた環境変数は**サーバーサイドとクライアントサイドの両方でアクセス可能**。これにより、フロントエンドのコードで直接参照することができます。そのため、秘密情報やセキュリティに関わる値は`NEXT_PUBLIC_`プレフィックスなしで保管するべき。