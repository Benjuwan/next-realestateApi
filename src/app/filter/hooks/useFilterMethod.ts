import { useContext } from "react";
import { EstateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { GetFetchEachCode } from "@/app/providers/filter/GetFetchEachCode";

export const useFilterMethod = () => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);
    const { setGetFetchPrefCode } = useContext(GetFetchEachCode);

    /* フィルター：Type（用途）*/
    const FilterType: (filterWord: string | null) => void = (filterWord: string | null) => {
        const filterTypeAry: EstateInfoJsonDataContents[] = [...isGetFetchData].filter(els => filterWord === els.Type);
        setGetFetchData(filterTypeAry);
    }

    /* フィルター：DistrictName（地区）*/
    const FilterPlace: (filterWord: string | null) => void = (filterWord: string | null) => {
        const filterPlaceAry: EstateInfoJsonDataContents[] = [...isGetFetchData].filter(els => els.DistrictName.match(`${filterWord}`));
        if (filterPlaceAry.length === 0) {
            alert(`地区名「${filterWord}」は、\n検索条件のデータ内に存在しません。`);
            return; // リターンで処理終了
        } else {
            setGetFetchData(filterPlaceAry);
        }
    }

    /* フィルター：特定の文字列 */
    const FilterSpecificWord: (
        targetElsAry: HTMLElement[] | NodeListOf<HTMLElement>,
        filterWord: string | null,
        setSpecificContents: (value: React.SetStateAction<HTMLElement[] | NodeListOf<HTMLElement>>) => void
    ) => void = (
        targetElsAry: HTMLElement[] | NodeListOf<HTMLElement>,
        filterWord: string | null,
        setSpecificContents: (value: React.SetStateAction<HTMLElement[] | NodeListOf<HTMLElement>>) => void
    ) => {
            const filterTypeAry: HTMLElement[] | NodeListOf<HTMLElement> = Array.from(targetElsAry).filter(els => els.textContent?.match(`${filterWord}`));
            setSpecificContents(filterTypeAry);
        }

    /* データリセット */
    const ResetFilter: () => void = () => {
        setGetFetchData([]); // フィルターのかかったデータを一旦削除（配列を空に）
        setGetFetchPrefCode('01'); // 都道府県コードを初期値に戻す
    }

    return { FilterType, FilterPlace, FilterSpecificWord, ResetFilter }
}