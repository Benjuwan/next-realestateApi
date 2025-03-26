import { useContext } from "react";
import { EstateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

export const useSortMethod = () => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);

    /* ソート機能 */
    const _SortMethod: (sortType: string) => EstateInfoJsonDataContents[] | undefined = (sortType: string) => {
        if (sortType === '昇順') {
            /* オブジェクトの配列は key（プロパティ）の値を比較することで並べ替えが可能 */
            return [...isGetFetchData].sort((aheadEl, behindEl) => parseInt(aheadEl.TradePrice) - parseInt(behindEl.TradePrice));
        } else if (sortType === '降順') {
            /* オブジェクトの配列は key（プロパティ）の値を比較することで並べ替えが可能 */
            return [...isGetFetchData].sort((aheadEl, behindEl) => parseInt(behindEl.TradePrice) - parseInt(aheadEl.TradePrice));
        }
    }

    /* 昇順 */
    const ascClick: () => void = () => {
        const askAry: EstateInfoJsonDataContents[] | undefined = _SortMethod('昇順');
        if (askAry !== undefined) {
            setGetFetchData(askAry);
        }
    }

    /* 降順 */
    const deskClick: () => void = () => {
        const deskAry: EstateInfoJsonDataContents[] | undefined = _SortMethod('降順');
        if (deskAry !== undefined) {
            setGetFetchData(deskAry);
        }
    }

    return { ascClick, deskClick }
}