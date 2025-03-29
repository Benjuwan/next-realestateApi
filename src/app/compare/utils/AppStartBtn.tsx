/* 祖先コンポーネント（CompareComponent.tsx）でクライアントコンポーネントの宣言済みなので "use client" は不要 */

import { memo, useContext } from "react";
import compareStyle from "../../styles/compare.module.css";
import { GetFetchEachCode } from "@/app/providers/filter/GetFetchEachCode";
import { CompareSortGraphAction } from "@/app/providers/compare/CompareSortGraphAction";
import { AverageCalcListType } from "./CompareComponent";
import { get_Pref_CompareYearData } from "@/app/server-action/getPrefCompareYearData";
import { useCalcAverageFee } from "@/app/hooks/useCalcAverageFee";

type AppStartBtnType = {
    isAppStartBtn: boolean;
    termLists_from: number;
    termLists_to: number;
    isViewChart: boolean;
    setViewChart: React.Dispatch<React.SetStateAction<boolean>>;
    averageCalcLists: AverageCalcListType[];
    setAverageCalcLists: React.Dispatch<React.SetStateAction<AverageCalcListType[]>>;
};

function AppStartBtn({ props }: { props: AppStartBtnType }) {
    const { isAppStartBtn, termLists_from, termLists_to, isViewChart, setViewChart, averageCalcLists, setAverageCalcLists } = props;

    const { isGetFetchPrefCode, isGetFetchCityCode, thePrefCityName, setPrefCityName } = useContext(GetFetchEachCode);
    const { setSortGraphAction } = useContext(CompareSortGraphAction);

    const { calcAverageFee } = useCalcAverageFee();

    /* フェッチしたデータをグラフ表示 */
    const _viewGetFetchData: (tradePrice: string[], yearCountUp_untill_termLists_to: number) => void = (
        tradePrice: string[],
        yearCountUp_untill_termLists_to: number
    ) => {
        if (tradePrice.length <= 0) {
            console.error('getFetchData not exist.');
            return;
        }

        /* ソート＆グラフ表示ボタンの disabled を設定 */
        setSortGraphAction(true);

        const resElAry: string[] = tradePrice.map((priceData, i) => {
            if (i === tradePrice.length - 1) {
                /* 年間データの処理完了シグナルとして */
                return `${priceData}.`;
            }
            return priceData;
        });

        /* 平均価格を算出 */
        const AverageCalcAry: (string | number)[] = calcAverageFee(yearCountUp_untill_termLists_to, resElAry);

        const newAverageCalcList: AverageCalcListType = {
            averageCalcEl: AverageCalcAry
        }
        setAverageCalcLists((prev) => [...prev, newAverageCalcList]);

        /* ソート＆グラフ表示ボタンの disabled を解除 */
        setSortGraphAction(false);
    }

    /* 計測開始アクション */
    const appStartAction: () => void = () => {
        if (averageCalcLists.length > 0) {
            setAverageCalcLists([]); // 既にリストがある場合は初期化
        }

        if (isViewChart) {
            setViewChart(false); // chart の初期化
        }

        /* 都道府県名と市区町村名を表示 */
        setPrefCityName({ ...thePrefCityName, selectChange: false });
    }

    /* サーバーアクション */
    const async_serverAction_getPrefCompareYearData: () => Promise<void> = async () => {
        let yearCountUp_untill_termLists_to: number = termLists_from;
        while (yearCountUp_untill_termLists_to <= termLists_to) {
            const tradePrice: string[] | undefined = await get_Pref_CompareYearData(yearCountUp_untill_termLists_to.toString(), isGetFetchPrefCode, isGetFetchCityCode);

            if (typeof tradePrice !== "undefined") {
                /* フェッチしたデータをグラフ表示 */
                _viewGetFetchData(tradePrice, yearCountUp_untill_termLists_to);
            } else {
                alert('今回選択した項目・条件のデータは存在しません');
                location.reload();
                break;
            }

            yearCountUp_untill_termLists_to++;
        }
    }

    return (
        <button type="button" className={compareStyle.appStartBtn}
            disabled={isAppStartBtn}
            onClick={async () => {
                appStartAction();
                async_serverAction_getPrefCompareYearData();
            }}>計測スタート
        </button>
    );
}

export default memo(AppStartBtn);