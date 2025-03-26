import { memo, useState, useContext } from "react";
import compareStyle from "../../styles/compare.module.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { CompareSortGraphAction } from "../../providers/compare/CompareSortGraphAction";

type CompareListsSortLists_viewGraphType = {
    isViewChart: boolean;
    setViewChart: React.Dispatch<React.SetStateAction<boolean>>;
}

type chartDataType = {
    name: string,
    uv: number,
    pv?: number,
    amt?: number
}

function CompareSortListsViewGraph({ props }: { props: CompareListsSortLists_viewGraphType }) {
    const { isViewChart, setViewChart } = props;

    /* 各種 Context */
    const { isSortGraphAction } = useContext(CompareSortGraphAction);

    const getChartDataSrc: chartDataType[] = []; // 取得した平均取引価格データを受け取る一次配列（getChartDataSrc の中身を反転させて isChartData へ反映させる）
    const [isChartData, setChartData] = useState<chartDataType[]>([]); // LineChart コンポーネントの data に渡すための State

    /* 取得した各年の平均取引価格のソート及びグラフ表示メソッド */
    const sortLists_viewGraph: () => void = () => {
        const AverageCalcListsLiEls: NodeListOf<HTMLLIElement> | undefined = document.querySelectorAll(`.${compareStyle.AverageCalcLists} li`); // 計測結果リスト

        if (typeof AverageCalcListsLiEls !== "undefined") {
            // 年数でソート
            const sortListEls: HTMLLIElement[] = Array.from(AverageCalcListsLiEls).sort((ahead, behind) => {
                // id属性
                const aheadEl: number = Number(ahead.querySelector(`#${compareStyle.annualYear}`)?.textContent);
                const behindEl: number = Number(behind.querySelector(`#${compareStyle.annualYear}`)?.textContent);
                return behindEl - aheadEl;
            });

            const AverageCalcLists: HTMLUListElement | null = document.querySelector(`.${compareStyle.AverageCalcLists}`); // 計測結果リストの親要素
            if (AverageCalcLists !== null) {
                AverageCalcLists.innerHTML = ""; // 親要素の中身をリセット
                sortListEls.forEach(sortListEl => {
                    AverageCalcLists.insertAdjacentElement('afterbegin', sortListEl); // ソートした内容をセット
                });
            }

            /* chart 表示 */
            sortListEls.forEach((lists, i) => {
                // id属性
                const annualYear: string | undefined | null = lists.querySelector(`#${compareStyle.annualYear}`)?.textContent;

                // id属性
                const averageTradePrice: number | undefined | null = Number(lists.querySelector(`#${compareStyle.averageTradePrice}`)?.textContent?.split(',').join('')); // 平均価格の文字列からカンマを取り除いて数値型に変換

                getChartDataSrc.push({ name: '', uv: 0 }); // chart 表示用のオブジェクト配列（一次配列）に取得した年間データ分の{object 要素}を追加

                /* 追加した{object 要素}に各年間データの内容を代入していく */
                if (annualYear && averageTradePrice) {
                    getChartDataSrc[i].name = annualYear;
                    getChartDataSrc[i].uv = averageTradePrice;
                }
            });
            const Adjust_getChartDataSrc = getChartDataSrc.reverse(); // 一次配列の中身を反転
            setChartData(Adjust_getChartDataSrc); //（isChartData のリセット処理を記述していないため）処理ごとに倍数されるのでスプレッド構文（[...isChartData, ...getChartDataSrc]）は使用しない
            setViewChart(true); // chart コンポーネントを表示
        }
    }

    return (
        <div className={compareStyle.SortListsViewGraphWrapper}>
            <button
                type="button"
                className={compareStyle.sortLists_viewGraphBtn}
                disabled={isSortGraphAction}
                onClick={sortLists_viewGraph}
            >ソート&amp;グラフを表示</button>
            <p>計測結果は随時追加されていきます。指定した計測年数データが揃った後にソート&amp;グラフ表示してください。</p>
            {isViewChart &&
                <div className={compareStyle.LineChartWrapper}>
                    <LineChart width={600} height={300} data={isChartData}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </LineChart>
                </div>
            }
            <ul className={compareStyle.AverageCalcLists}></ul>
        </div>
    );
}

export default memo(CompareSortListsViewGraph);