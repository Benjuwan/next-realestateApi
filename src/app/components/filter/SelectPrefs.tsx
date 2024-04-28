import { ChangeEvent, memo } from "react";
import SelectCities from "./SelectCities";
import { prefcodeData } from "@/app/utils/prefcodeData";

function SelectPrefs() {
    /* 非nullアサーション演算子[!]：その直前のオブジェクトがnullまたはundefinedでないことをTypeScriptにアサート（主張）する。未定義（undefined）の場合はそれが加味された処理・結果になるが、実行時にnullまたはundefinedが発生するとアプリケーションはクラッシュする可能性がある */
    const API_KEY: string = process.env.NEXT_PUBLIC_REINFOLIB_API_KEY!; // Fetch your API_KEY

    const get_SelectElValue_CityCode = async () => {
        /* form 要素を親に持っていないと下記の記述（ParentEl.querySelector('select')?.value）は不可能 */
        const prefLists: HTMLSelectElement | null = document.querySelector('#prefLists');
        const currentPrefListsValue: string | undefined = prefLists?.value;
        if (typeof currentPrefListsValue !== "undefined") {
            const responese = await fetch(`https://www.reinfolib.mlit.go.jp/ex-api/external/XIT002?area=${currentPrefListsValue}`, {
                headers: {
                    "Ocp-Apim-Subscription-Key": API_KEY,
                },
            });
            const resObj = await responese.json();
            const resObjDataAry = resObj.data;
            console.log(resObj, resObjDataAry);
        }
    }

    return (
        <>
            <form action="" onChange={(el: ChangeEvent<HTMLFormElement>) => {
                el.preventDefault();
                get_SelectElValue_CityCode();
            }}>
                <select name="" id="prefLists">
                    {prefcodeData.map((data) => (
                        <option value={data.prefcode} key={data.prefcode}>{data.prefJaName}</option>
                    ))}
                </select>
            </form>
            {/* <SelectCities /> */}
        </>
    );
}

export default memo(SelectPrefs);