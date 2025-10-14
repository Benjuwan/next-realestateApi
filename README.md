# Next.js-realEstateApi
日本各地の不動産取引データを取得するサイトです。国交省の「[不動産情報ライブラリ](https://www.reinfolib.mlit.go.jp/)」ページのAPIを使ってデータを取得しています。

- 公開サイト：[https://next-realestate-api.vercel.app/](https://next-realestate-api.vercel.app/)

## 技術構成
- @eslint/eslintrc@3.3.1
- @types/node@22.18.10
- @types/react-dom@19.2.2
- @types/react@19.2.2
- @typescript-eslint/eslint-plugin@8.46.1
- @typescript-eslint/parser@8.46.1
- eslint-config-next@15.5.5
- eslint@8.57.1
- next@15.5.5
- react-dom@19.2.0
- react@19.2.0
- recharts@3.2.1
- typescript@5.9.3

> [!NOTE]
> - `npm audit`で定期的に脆弱性のチェックを行う
> - `npm update`で定期的に（互換性を維持した）更新を行う
>   - `^`（キャレット：「指定されたバージョンからメジャーバージョンを変更しない範囲で最新のバージョンまでを許容」する機能を示す記号）が付いていても油断せず定期的にチェックする<br>例：`"next": "^14.2.12"`の場合、14.2.12以上 15.0.0未満のバージョンが許容される
> - `npm outdated`で表示される`Current`と`Wanted`の内容が等しいのが望ましい

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