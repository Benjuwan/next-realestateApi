# Next.js-realEstateApi

[https://github.com/Benjuwan/realEstateApi](https://github.com/Benjuwan/realEstateApi)で制作した`React`app の`Next.js`ver（※使用していたAPIの廃止に伴って`Next.js`で新規作成）

## 概要
日本各地の不動産取引データを取得するサイトです。国交省の「[不動産情報ライブラリ](https://www.reinfolib.mlit.go.jp/)」ページのAPIを使ってデータを取得しています。

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

## 参考情報
- [サーバーアクション](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)