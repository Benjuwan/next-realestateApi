"use server";

import { fetchCityData } from "../ts/cityDataAryEls";

export async function get_PrefCityYearTerm_TargetValueData(formdata: FormData) {
    /* 非nullアサーション演算子[!]
     * その直前のオブジェクトがnullまたはundefinedでないことをTypeScriptにアサート（主張）する。未定義（undefined）の場合はそれが加味された処理・結果になるが、実行時にnullまたはundefinedが発生するとアプリケーションはクラッシュする可能性がある 
    */
    const API_KEY: string = process.env.NEXT_PUBLIC_REINFOLIB_API_KEY!;

    const response = await fetch(`https://www.reinfolib.mlit.go.jp/ex-api/external/XIT001?year=${year}&quarter=${term}&city=13102&priceClassification=01`, {
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });

    const resObj: fetchCityData = await response.json();
    // console.log(resObj.status);

    return resObj.data;
}