// "use client"
/* 親コンポーネント（SelectEls.tsx）でクライアントコンポーネントの宣言済みなので再度 "use client" は不要 */

import { GetFetchEachCode } from "@/app/providers/filter/GetFetchEachCode";
import React, { useContext, useEffect, useState, ChangeEvent, memo } from 'react';
import { cityAry } from "@/app/ts/cityDataAryEls";
import { prefcodeData } from "@/app/components/layout/prefcodeData";
import { get_SelectElValue_CityCode } from "../../server-action/getSelectElValueCityCode";

function SelectPrefCities() {
    const { isGetFetchPrefCode, setGetFetchPrefCode, setGetFetchCityCode } = useContext(GetFetchEachCode);

    const [cities, setCities] = useState<cityAry[]>([]);

    useEffect(() => {
        if (isGetFetchPrefCode) {
            const fetchCityCode = async () => {
                const resObjDataAry: cityAry[] = await get_SelectElValue_CityCode(isGetFetchPrefCode);
                setCities((_prevCities) => resObjDataAry);
            }
            fetchCityCode();
        }
    }, [isGetFetchPrefCode]);

    return (
        <>
            <div id="prefListsWrapper">
                <select name="" id="prefLists" onChange={async (e: ChangeEvent<HTMLSelectElement>) => {
                    const newPrefCode: string = (e.target as HTMLSelectElement).value;
                    const resObjDataAry: cityAry[] = await get_SelectElValue_CityCode(newPrefCode);
                    setGetFetchPrefCode((_prevGetFetchPrefCode) => newPrefCode);
                    setCities((_prevCities) => resObjDataAry);
                }}>
                    {prefcodeData.map((data) => (
                        <option value={data.prefcode} key={data.prefcode}>{data.prefJaName}</option>
                    ))}
                </select>
            </div>
            <div id="citiesListsWrapper">
                <select name="" id="citiesLists" onChange={(e: ChangeEvent<HTMLSelectElement>) => setGetFetchCityCode((_prevGetFetchCityCode) => e.target.value)}>
                    {cities.map(city => (
                        <option key={city.id} label={city.name} value={city.id}>{city.name}</option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default memo(SelectPrefCities);