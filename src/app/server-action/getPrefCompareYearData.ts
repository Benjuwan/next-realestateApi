"use server";

import { estateInfoJsonData, estateInfoJsonDataContents } from "../ts/estateInfoJsonData";

export async function get_Pref_CompareYearData(prefCode: string, year: string): Promise<estateInfoJsonDataContents[]> {
    /* 非nullアサーション演算子[!]
     * その直前のオブジェクトがnullまたはundefinedでないことをTypeScriptにアサート（主張）する。未定義（undefined）の場合はそれが加味された処理・結果になるが、実行時にnullまたはundefinedが発生するとアプリケーションはクラッシュする可能性がある 
    */
    const API_KEY: string = process.env.NEXT_PUBLIC_REINFOLIB_API_KEY!;

    const response = await fetch(`https://www.reinfolib.mlit.go.jp/ex-api/external/XIT001?year=${year}&area=${prefCode}`, {
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });

    const resObj: estateInfoJsonData = await response.json();
    // console.log(resObj);

    return resObj.data;
}