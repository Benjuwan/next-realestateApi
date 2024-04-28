import { useContext } from "react";
import { cityAry, cityData } from "../../ts/filterType/cityDataAryEls";
import { GetFetchPrefCode } from "../../providers/filter/GetFetchPrefCode";

export const useFetchPrefData = () => {
    /* 非nullアサーション演算子[!]：その直前のオブジェクトがnullまたはundefinedでないことをTypeScriptにアサート（主張）する。未定義（undefined）の場合はそれが加味された処理・結果になるが、実行時にnullまたはundefinedが発生するとアプリケーションはクラッシュする可能性がある */
    const API_KEY: string = process.env.NEXT_PUBLIC_REINFOLIB_API_KEY!; // Fetch your API_KEY

    const { isGetFetchPrefCode } = useContext(GetFetchPrefCode); // 都道府県コード

    const FetchPrefData: (
        isCities: cityAry[],
        setCities: React.Dispatch<React.SetStateAction<cityAry[]>>
    ) => void = (
        isCities: cityAry[],
        setCities: React.Dispatch<React.SetStateAction<cityAry[]>>
    ) => {
            const fetchPrefDataMethod: () => Promise<void> = async () => {
                const response = await fetch(`https://www.reinfolib.mlit.go.jp/ex-api/external/XIT001?area=${isGetFetchPrefCode}`, {
                    headers: {
                        "Ocp-Apim-Subscription-Key": API_KEY,
                    }
                });
                console.log(response)
                const resObj: cityData = await response.json();
                const PrefAry: cityAry[] = resObj.data;
                const resObjAry = PrefAry.map(aryEl => {
                    return aryEl;
                });
                setCities((_prevAry) => [...isCities, ...resObjAry]);
            }
            fetchPrefDataMethod();
        }

    return { FetchPrefData }
}