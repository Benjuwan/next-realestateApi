import { memo, useState, useContext } from "react";
import compareStyle from "../../styles/compare.module.css";
import { CompareSortGraphAction } from "../../providers/compare/CompareSortGraphAction";
import { GetFetchEachCode } from "../../providers/filter/GetFetchEachCode";
import { AverageCalcListType } from "./CompareComponent";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

type CompareListsSortLists_viewGraphType = {
    isViewChart: boolean;
    setViewChart: React.Dispatch<React.SetStateAction<boolean>>;
    averageCalcLists: AverageCalcListType[];
    setAverageCalcLists: React.Dispatch<React.SetStateAction<AverageCalcListType[]>>;
};

type chartDataType = {
    name: string,
    uv: number,
    pv?: number,
    amt?: number
};

function CompareSortListsViewGraph({ props }: { props: CompareListsSortLists_viewGraphType }) {
    const { isViewChart, setViewChart, averageCalcLists, setAverageCalcLists } = props;

    /* 各種 Context */
    const { isSortGraphAction } = useContext(CompareSortGraphAction);
    const { thePrefCityName, setPrefCityName } = useContext(GetFetchEachCode);

    /* LineChart コンポーネントの data に渡すための State */
    const [isChartData, setChartData] = useState<chartDataType[]>([]);

    /* 取得した各年の平均取引価格のソート及びグラフ表示メソッド */
    const sortLists_viewGraph: () => void = () => {
        if (averageCalcLists.length === 0) {
            return;
        }

        /* 都道府県名と市区町村名を表示 */
        setPrefCityName({ ...thePrefCityName, selectChange: false });

        /* 取得した平均取引価格データを受け取る一次配列（getChartDataSrc の中身を反転させて isChartData へ反映させる） */
        const getChartDataSrc: chartDataType[] = [];

        /* 年数でソート */
        const sortLists: AverageCalcListType[] = averageCalcLists.sort((ahead, behind) => {
            const aheadEl: number = Number(ahead.averageCalcEl[0]);
            const behindEl: number = Number(behind.averageCalcEl[1]);
            return behindEl - aheadEl;
        });
        setAverageCalcLists(sortLists);

        /* chart 表示 */
        sortLists.forEach((listItem, i) => {
            const annualYear: string = listItem.averageCalcEl[0].toString();

            /* 平均価格の文字列からカンマを取り除いて数値型に変換 */
            const averageTradePrice: number | undefined | null = Number(listItem.averageCalcEl[1].toString().split(',').join(''));

            /* chart 表示用のオブジェクト配列（一次配列）に取得した年間データ分の{object 要素}を追加 */
            getChartDataSrc.push({ name: '', uv: 0 });

            if (annualYear.length > 0 && averageTradePrice >= 0) {
                /* 各年間データの内容を代入 */
                getChartDataSrc[i].name = annualYear;
                getChartDataSrc[i].uv = averageTradePrice;
            }
        });

        /* 年数を順当でソート */
        const Adjust_getChartDataSrc: chartDataType[] = getChartDataSrc.toSorted((ahead, behind) => parseInt(ahead.name) - parseInt(behind.name));
        setChartData(Adjust_getChartDataSrc);

        setViewChart(true); // chart コンポーネントを表示
    }

    return (
        <div className={compareStyle.SortListsViewGraphWrapper}>
            <button
                type="button"
                className={compareStyle.sortLists_viewGraphBtn}
                disabled={isSortGraphAction || thePrefCityName.selectChange}
                onClick={sortLists_viewGraph}
            >ソート&amp;グラフを表示
            </button>
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
        </div>
    );
}

export default memo(CompareSortListsViewGraph);