"use server";

import { CityAry, FetchCityData } from "../ts/cityDataAryEls";

export async function get_SelectElValue_CityCode(prefCode: string): Promise<CityAry[] | undefined> {
    /* 非nullアサーション演算子[!]
     * その直前のオブジェクトがnullまたはundefinedでないことをTypeScriptにアサート（主張）する。未定義（undefined）の場合はそれが加味された処理・結果になるが、実行時にnullまたはundefinedが発生するとアプリケーションはクラッシュする可能性がある 
    */
    const API_KEY: string = process.env.NEXT_PUBLIC_REINFOLIB_API_KEY!;

    const response = await fetch(`https://www.reinfolib.mlit.go.jp/ex-api/external/XIT002?area=${prefCode}`, {
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });

    const resObj: FetchCityData = await response.json();
    // console.log(resObj.status);

    try {
        if (resObj.message) {
            throw new Error(`fetch failed or no Results：${resObj.message}`);
        }

        return resObj.data;
    } catch (error) {
        console.error('error occurred - get_SelectElValue_CityCode.ts', error);
    }
}