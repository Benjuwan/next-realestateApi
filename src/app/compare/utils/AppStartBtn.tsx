/* 祖先コンポーネント（CompareComponent.tsx）でクライアントコンポーネントの宣言済みなので "use client" は不要 */

import { memo, useContext } from "react";
import { CompareSortGraphAction } from "@/app/providers/compare/CompareSortGraphAction";
import { GetFetchEachCode } from "@/app/providers/filter/GetFetchEachCode";
import { useCalcAverageFee } from "@/app/hooks/useCalcAverageFee";
import { get_Pref_CompareYearData } from "@/app/server-action/getPrefCompareYearData";

type AppStartBtnType = {
    isAppStartBtn: boolean;
    termLists_from: number;
    termLists_to: number;
    isViewChart: boolean;
    setViewChart: React.Dispatch<React.SetStateAction<boolean>>;
}

function AppStartBtn({ props }: { props: AppStartBtnType }) {
    const { isAppStartBtn, termLists_from, termLists_to, isViewChart, setViewChart } = props;

    const { isGetFetchPrefCode, isGetFetchCityCode } = useContext(GetFetchEachCode);

    const { setSortGraphAction } = useContext(CompareSortGraphAction);

    const { calcAverageFee } = useCalcAverageFee();

    /* サーバーアクション */
    const async_serverAction_getPrefCompareYearData: () => Promise<void> = async () => {
        let yearCountUp_untill_termLists_to: number = termLists_from;
        while (yearCountUp_untill_termLists_to <= termLists_to) {
            const tradePrice: string[] | undefined = await get_Pref_CompareYearData(yearCountUp_untill_termLists_to.toString(), isGetFetchPrefCode, isGetFetchCityCode);
            if (typeof tradePrice !== "undefined") {
                _viewGetFetchData(tradePrice, yearCountUp_untill_termLists_to); // フェッチしたデータをグラフ表示
            } else {
                alert('今回選択した項目・条件のデータは存在しません');
                location.reload();
                break;
            }
            yearCountUp_untill_termLists_to++;
        }
    }

    /*（都道府県名・市区町村名を取得するための）計測ボタンのアクション */
    const _getPrefCityName: (prefSelectOption: NodeListOf<HTMLOptionElement>, prefSelectEl: HTMLSelectElement | null) => string = (
        prefSelectOption: NodeListOf<HTMLOptionElement>,
        prefSelectEl: HTMLSelectElement | null
    ) => {
        const nameBoxes: string[] = [];
        prefSelectOption.forEach(optionEl => {
            if (optionEl.value === prefSelectEl?.value) {
                nameBoxes.push(optionEl.label);
            }
        });
        return nameBoxes[0];
    }

    /* フェッチしたデータをグラフ表示 */
    const _viewGetFetchData: (tradePrice: string[], yearCountUp_untill_termLists_to: number) => void = (
        tradePrice: string[],
        yearCountUp_untill_termLists_to: number
    ) => {
        if (tradePrice.length <= 0) {
            console.error('getFetchData not exist.');
            return;
        }

        setSortGraphAction(true); // ソート＆グラフ表示ボタンの disabled を設定

        const resElAry: string[] = tradePrice.map((priceData, i) => {
            if (i === tradePrice.length - 1) {
                return `${priceData}.`; // 年間データの処理完了シグナルとして
            } else {
                return priceData;
            }
        });

        /* 平均価格を算出 */
        const AverageCalcAry: (string | number)[] = calcAverageFee(yearCountUp_untill_termLists_to, resElAry);

        /**
         *【各年の平均価格をリアル DOM へ反映】
         * _AverageCalc メソッドは随時処理されていく（appStart メソッド内の forEach 処理）ので グローバル State だと差し変わっていってしまう
         * ソートをしようにも上記同様、随時処理（一つずつ生成）なのでソートできない
         * この2点から手続き的処理で進める
        */
        const AverageCalcLists: HTMLUListElement | null = document.querySelector('.AverageCalcLists');
        AverageCalcLists?.insertAdjacentHTML('afterbegin', `<li><span id="annualYear">${AverageCalcAry[0]}</span><span id="averageTradePrice">${AverageCalcAry[1]}</span></li>`);

        setSortGraphAction(false); // ソート＆グラフ表示ボタンの disabled を解除
    }

    const appStart: () => void = () => {
        if (isViewChart === true) setViewChart(false); // chart の初期化

        if (termLists_from !== termLists_to && termLists_from < termLists_to) {
            /* 既にリストが存在する場合はリセットする */
            const AverageCalcLists: HTMLUListElement | null = document.querySelector('.AverageCalcLists');
            if (AverageCalcLists !== null && AverageCalcLists.childNodes.length > 0) AverageCalcLists.innerHTML = "";

            /* 計測終了期間から計測開始期間を差し引いて計測期間リストを生成 */
            const termLists: number[] = [];
            const targetValue: number = termLists_to - termLists_from;
            for (let i = 0; i <= targetValue; i++) {
                const termValue: number = termLists_from + i;
                termLists.push(termValue);
            }

            const citySelectEl: HTMLSelectElement | null = document.querySelector('#citiesLists');

            /* 都道府県名・市区町村名の表示 */
            const prefCityName = document.querySelector('#prefCityName');
            const prefSelectEl: HTMLSelectElement | null = document.querySelector('#prefLists');
            const prefSelectOption: NodeListOf<HTMLOptionElement> | undefined = prefSelectEl?.querySelectorAll('option');
            const citySelectOption: NodeListOf<HTMLOptionElement> | undefined = citySelectEl?.querySelectorAll('option');
            if (
                typeof prefSelectOption !== "undefined" &&
                typeof citySelectOption !== "undefined"
            ) {
                const prefName = _getPrefCityName(prefSelectOption, prefSelectEl);
                const cityName = _getPrefCityName(citySelectOption, citySelectEl);
                if (prefCityName !== null) prefCityName.innerHTML = `現在表示されているのは<span>「${prefName} ${cityName}」</span>の情報です。`;
            }
        }
    }

    return (
        <button type="button" className="appStartBtn" disabled={isAppStartBtn} onClick={async () => {
            async_serverAction_getPrefCompareYearData();
            appStart();
        }}>計測スタート</button>
    );
}

export default memo(AppStartBtn);