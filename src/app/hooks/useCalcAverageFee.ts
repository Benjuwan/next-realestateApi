export const useCalcAverageFee = () => {
    /* 取得した tradePrice データから平均価格を算出 */
    const calcAverageFee: (annualYear: number, resElAry: string[]) => (string | number)[] = (
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

    return { calcAverageFee }
}