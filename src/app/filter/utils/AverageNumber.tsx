import { useEffect, useState, useContext, memo } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

function AverageNumber({ TRADE_PRICE }: { TRADE_PRICE: string[] }) {
    const { isGetFetchData } = useContext(GetFetchDataContext);

    useEffect(() => {
        const averageCalcResult: string = averageCalc();
        setAveragePrice(averageCalcResult);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetFetchData]);

    const [isAveragePrice, setAveragePrice] = useState<string>('');
    const averageCalc: () => string = () => {
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
    }

    return isAveragePrice;
}

export default memo(AverageNumber);