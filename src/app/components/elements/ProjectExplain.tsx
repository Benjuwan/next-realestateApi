'use client'
import { memo } from "react";
import Link from "next/link";

function ProjectExplain() {
    return (
        <>
            <p>ここでは「日本各地の不動産取引データ」を確認できます。データ取得元は『国土交通省』の「<Link href={'https://www.reinfolib.mlit.go.jp/'} target="\blank">不動産情報ライブラリ</Link>」です。下記ドロップダウンリストから取得後の表示仕様・機能を選んでください。</p>
            <ul>
                <li>・<b>pager ver</b>：取得したデータをページ送りで閲覧する機能</li>
                <li>・<b>filter ver</b>：取引価格によるソート機能や市区町村内の特定地区の検索機能</li>
                <li>・<b>compare ver</b>：指定年数と場所に応じた不動産の年間取引平均価格を比較表示（リスト及びグラフ）する機能が用意されています。</li>
            </ul>
        </>
    );
}

export default memo(ProjectExplain);