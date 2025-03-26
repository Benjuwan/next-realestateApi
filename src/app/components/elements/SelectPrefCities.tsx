// "use client"
/* 親コンポーネント（SelectEls.tsx）でクライアントコンポーネントの宣言済みなので再度 "use client" は不要 */

import React, { useContext, useEffect, useState, ChangeEvent, memo } from 'react';
import selectElsStyles from "../../styles/selectEls.module.css";
import { GetFetchEachCode } from "@/app/providers/filter/GetFetchEachCode";
import { CityAry } from "@/app/ts/cityDataAryEls";
import { prefcodeData } from "@/app/components/layout/prefcodeData";
import { get_SelectElValue_CityCode } from "../../server-action/getSelectElValueCityCode";

function SelectPrefCities() {
    const { isGetFetchPrefCode, setGetFetchPrefCode, setGetFetchCityCode } = useContext(GetFetchEachCode);

    const [cities, setCities] = useState<CityAry[]>([]);

    useEffect(() => {
        /* 選択済み市区町村に応じた都道府県をデフォルト選択：selected={data.prefcode === isGetFetchPrefCode} を JSX に直接記述すると React がエラーを出すので手続き的処理で実装 */
        const prefListsOptions: NodeListOf<HTMLOptionElement> = document.querySelectorAll('#PREF_LISTS option');
        prefListsOptions.forEach(option => {
            if (option.getAttribute('value') === isGetFetchPrefCode) {
                option.setAttribute('selected', 'true');
            }
        });

        if (isGetFetchPrefCode) {
            const fetchCityCode = async () => {
                const resObjDataAry: CityAry[] | undefined = await get_SelectElValue_CityCode(isGetFetchPrefCode);
                if (typeof resObjDataAry !== "undefined") {
                    setGetFetchCityCode(resObjDataAry[0].id);
                    setCities(resObjDataAry);
                }
            }
            fetchCityCode();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetFetchPrefCode]);

    return (
        <div className={selectElsStyles.termEls}>
            <div id="prefListsWrapper">
                <select name="" id="PREF_LISTS" onChange={async (e: ChangeEvent<HTMLSelectElement>) => {
                    const resObjDataAry: CityAry[] | undefined = await get_SelectElValue_CityCode(e.target.value);
                    setGetFetchPrefCode(e.target.value);
                    if (typeof resObjDataAry !== "undefined") {
                        setCities(resObjDataAry);
                    }
                }}>
                    {prefcodeData.map((data) => (
                        <option value={data.prefcode} key={data.prefcode}>{data.prefJaName}</option>
                    ))}
                </select>
            </div>
            <div id="citiesListsWrapper">
                <select name="" id="CITIES_LISTS" onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setGetFetchCityCode(e.target.value);
                }}>
                    {cities.map(city => (
                        <option key={city.id} label={city.name} value={city.id}>{city.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default memo(SelectPrefCities);