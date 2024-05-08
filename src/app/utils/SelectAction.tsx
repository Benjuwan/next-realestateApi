"use client"

import { ChangeEvent, memo } from "react";
import { useRouter } from "next/navigation";

function SelectAction() {
    const router = useRouter();

    return (
        /* 選択した option の値（の文字列）を遷移先ページパスに指定 */
        <select name="" id="actionLists" onChange={(e: ChangeEvent<HTMLSelectElement>) => router.push(`/${e.target.value}`)}>
            <option defaultValue={undefined}>以下から選択してください</option>
            <option value="pager">pager（ページ送り）</option>
            <option value="filter">filter（検索）</option>
            <option value="compare">compare（比較）</option>
        </select>
    );
}

export default memo(SelectAction);