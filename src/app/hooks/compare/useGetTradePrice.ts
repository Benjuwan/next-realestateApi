import { useContext } from "react";
import { estateInfoJsonData, estateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { CompareSortGraphAction } from "../../providers/compare/CompareSortGraphAction";
import { GetFetchPrefCode } from "../../providers/filter/GetFetchPrefCode";

export const useGetTradePrice = () => {
    /* 非nullアサーション演算子[!]：その直前のオブジェクトがnullまたはundefinedでないことをTypeScriptにアサート（主張）する。未定義（undefined）の場合はそれが加味された処理・結果になるが、実行時にnullまたはundefinedが発生するとアプリケーションはクラッシュする可能性がある */
    const API_KEY: string = process.env.NEXT_PUBLIC_REINFOLIB_API_KEY!; // Fetch your API_KEY

    /* 各種 Context */
    const { setSortGraphAction } = useContext(CompareSortGraphAction);
    const { isGetFetchPrefCode } = useContext(GetFetchPrefCode);

    /* 取得した tradePrice データから平均価格を算出 */
    const _AverageCalc: (annualYear: number, resElAry: string[]) => (string | number)[] = (
        annualYear: number,
        resElAry: string[]
    ) => {
        /* . を年間数値（annualYear）へ置換 */
        const replaceannualYearAry: (string | number)[] = [...resElAry].map(dataEl => {
            if (dataEl === '.') return annualYear;
            else return dataEl;
        });
        // console.log(replaceannualYearAry);

        /* reduce 処理のために加工 */
        const allTradePrices: number[] = [...replaceannualYearAry].filter(filterEl => {
            return typeof filterEl !== "number"; // annualYear を除外
        }).map(dataEl => {
            return Number(dataEl); // 数値型へ変換
        });

        /* 全価格を合算して平均価格を算出する */
        const reduceResult: number = allTradePrices.reduce((a, b) => a + b, 0);
        const averageNumber: number = reduceResult / resElAry.length;

        /* 平均価格（が Nan でない場合は）3桁区切りにして、年数と合わせて配列として返却する */
        let averageResultStr: string = '0';
        if (!Number.isNaN(averageNumber)) {
            averageResultStr = `${Math.floor(averageNumber).toLocaleString()}`;
        }
        // console.log(annualYear, averageResultStr);
        return [annualYear, averageResultStr];
    }

    const GetTradePrice: (cityCode?: string, annualValue?: number) => void = (
        cityCode: string = '27205', // 大阪府吹田市
        annualValue: number = 2023, // 2023年
    ) => {
        const ViewGetFetchData: () => Promise<void> = async () => {
            setSortGraphAction(true); // ソート＆グラフ表示ボタンの disabled を設定
            const responese = await fetch(`https://www.land.mlit.go.jp/webland/api/https://www.reinfolib.mlit.go.jp/ex-api/external/XIT001?year=${annualValue}&quarter=1&year=${annualValue}&quarter=4&area=${isGetFetchPrefCode}&city=${cityCode}`, {
                headers: {
                    "Ocp-Apim-Subscription-Key": API_KEY,
                },
            }); // ${annualValue}1～4で年間
            const resObj: estateInfoJsonData = await responese.json();
            const resObjDataAry: estateInfoJsonDataContents[] = resObj.data;

            console.log(resObj)

            if (responese.status === 200) {
                const resElAry: string[] = resObjDataAry.map((resEl, i) => {
                    if (i === resObjDataAry.length - 1) {
                        return resEl.TradePrice, '.'; // 年間データの処理完了シグナルとして
                    } else {
                        return resEl.TradePrice;
                    }
                });

                /* 平均価格を算出 */
                const AverageCalcAry: (string | number)[] = _AverageCalc(annualValue, resElAry);

                /**
                 *【各年の平均価格をリアル DOM へ反映】
                 * _AverageCalc メソッドは随時処理されていく（appStart メソッド内の forEach 処理）ので グローバル State だと差し変わっていってしまう
                 * ソートをしようにも上記同様、随時処理（一つずつ生成）なのでソートできない
                 * この2点から手続き的処理で進める
                */
                const AverageCalcLists: HTMLUListElement | null = document.querySelector('.AverageCalcLists');
                AverageCalcLists?.insertAdjacentHTML('afterbegin', `<li><span id="annualYear">${AverageCalcAry[0]}</span><span id="averageTradePrice">${AverageCalcAry[1]}</span></li>`);

                setSortGraphAction(false); // ソート＆グラフ表示ボタンの disabled を解除
            } else {
                console.error(responese.status);
            }
        }
        ViewGetFetchData();
    }

    return { GetTradePrice }
}