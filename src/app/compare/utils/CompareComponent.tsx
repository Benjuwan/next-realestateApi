"use client"
import { memo, useState } from "react";
import compareStyle from "../../styles/compare.module.css";
import CompareSelectTerm from "./CompareSelectTerm";
import CompareSortListsViewGraph from "./CompareSortListsViewGraph";
import SelectPrefCities from "@/app/components/elements/SelectPrefCities";

function CompareComponent() {
    /* chart コンポーネント表示判定用の State */
    const [isViewChart, setViewChart] = useState<boolean>(false);

    return (
        <div className={compareStyle.CompareComponentEl}>
            <div className={compareStyle.selectElsWrapper}>
                <div className={compareStyle.selectEls}>
                    <SelectPrefCities />
                    <CompareSelectTerm props={{
                        isViewChart: isViewChart,
                        setViewChart: setViewChart
                    }} />
                </div>
                <div className={compareStyle.explain}>
                    <p>指定された<b>場所</b>と<b>計測期間</b>における<b>不動産取引の年間平均取引価格</b>（*1）を確認できます。（*1：1～4の四半期通年の平均取引価格）</p>
                </div>
                <ul className={compareStyle.explainLists}>
                    <li>1：データ取得を希望する都道府県と市区町村、計測年数を指定して「計測スタート」ボタンを押してください。※計測結果は随時追加されていきます。</li>
                    <li>2：「ソート&amp;グラフを表示」ボタンを押すと取得データがソート及びグラフ表示されます。</li>
                </ul>
            </div>
            <p id={compareStyle.prefCityName}></p>
            <CompareSortListsViewGraph props={{
                isViewChart: isViewChart,
                setViewChart: setViewChart
            }} />
        </div>
    );
}

export default memo(CompareComponent);