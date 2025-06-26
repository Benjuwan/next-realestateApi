"use client"

import { memo, useContext, useState } from "react";
import compareStyle from "../../styles/compare.module.css";
import CompareSelectTerm from "./CompareSelectTerm";
import CompareSortListsViewGraph from "./CompareSortListsViewGraph";
import SelectPrefCities from "../../components/elements/SelectPrefCities";
import { GetFetchEachCode } from "../../providers/filter/GetFetchEachCode";

export type AverageCalcListType = {
    averageCalcEl: (string | number)[];
};

function CompareComponent() {
    const { thePrefCityName } = useContext(GetFetchEachCode);

    /* chart コンポーネント表示判定用の State */
    const [isViewChart, setViewChart] = useState<boolean>(false);

    /*（年数ごとの）平均価格リスト */
    const [averageCalcLists, setAverageCalcLists] = useState<AverageCalcListType[]>([]);

    return (
        <div className={compareStyle.CompareComponentEl}>
            <div className={compareStyle.selectElsWrapper}>
                <div className={compareStyle.selectEls}>
                    <SelectPrefCities />
                    <CompareSelectTerm props={{
                        isViewChart: isViewChart,
                        setViewChart: setViewChart,
                        averageCalcLists: averageCalcLists,
                        setAverageCalcLists: setAverageCalcLists
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
            {thePrefCityName.selectChange ||
                <p id={compareStyle.thePrefCityName}>現在表示されているのは<span>「{thePrefCityName.prefname} {thePrefCityName.cityname}」</span>の情報です。</p>
            }
            <CompareSortListsViewGraph props={{
                isViewChart: isViewChart,
                setViewChart: setViewChart,
                averageCalcLists: averageCalcLists,
                setAverageCalcLists: setAverageCalcLists
            }} />
            {averageCalcLists.length > 0 &&
                <ul className={compareStyle.AverageCalcLists}>
                    {averageCalcLists.map((averageCalcList, i) => (
                        <li key={i}>
                            <span className={compareStyle.annualYear}>{averageCalcList.averageCalcEl[0]}</span>
                            <span className={compareStyle.averageTradePrice}>{averageCalcList.averageCalcEl[1]}</span>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

export default memo(CompareComponent);