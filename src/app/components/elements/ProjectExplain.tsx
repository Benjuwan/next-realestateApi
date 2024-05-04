'use client'

import { ChangeEvent, memo } from "react";
import { useRouter } from 'next/navigation'

function ProjectExplain() {
    const router = useRouter();

    return (
        <>
            <p>ここでは「日本各地の不動産取引データ」を確認できます。下記ドロップダウンリストから取得後の表示仕様・機能を選んでください。</p>
            <ul>
                <li>・<b>pager ver</b>：取得したデータを随時追加・削除する機能、またはページ送り機能が用意されています。</li>
                <li>・<b>filter ver</b>：取引価格によるソート機能や市区町村内の特定地区の検索機能が用意されています。</li>
                <li>・<b>compare ver</b>：指定年数と場所に応じた不動産の年間取引平均価格を比較表示（リスト及びグラフ）する機能が用意されています。</li>
            </ul>
            <select name="" id="actionLists" onChange={(e: ChangeEvent<HTMLSelectElement>) => router.push(e.target.value)}>
                <option defaultValue={undefined}>以下から選択してください</option>
                <option value="pager">pager（ページ送り）</option>
                <option value="filter">filter（検索）</option>
                <option value="compare">compare（比較）</option>
            </select>
        </>
    );
}

export default memo(ProjectExplain);