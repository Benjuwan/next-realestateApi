import { useContext, memo, useCallback } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

function AverageNumber({ TRADE_PRICE }: { TRADE_PRICE: string[] }) {
    const { isGetFetchData } = useContext(GetFetchDataContext);

    const averageCalc: () => string = useCallback(() => {
        const averageTradePriceAry: number[] = [];

        for (const tradePrice of TRADE_PRICE) {
            const targetWord: string | undefined = tradePrice.split(',').join('');
            if (typeof targetWord !== "undefined") {
                averageTradePriceAry.push(parseInt(targetWord));
            }
        }

        const averageTradePrice: number = [...averageTradePriceAry].reduce((aheadEl, behindEl) => aheadEl + behindEl, 0);

        const averageNumber: string = Math.floor(averageTradePrice / isGetFetchData.length).toLocaleString();

        return averageNumber;
    }, [isGetFetchData, TRADE_PRICE]);

    const averageCalcResult: string = averageCalc();

    return averageCalcResult;
}

export default memo(AverageNumber);