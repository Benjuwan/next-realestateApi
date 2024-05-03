"use client"

import { prefcodeData } from "@/app/utils/prefcodeData";
import React, { useEffect, useState } from 'react';
import SelectCities from './SelectCities';
import { cityAry } from "@/app/ts/filterType/cityDataAryEls";
import useGetSelectElValueCityCode from "@/app/hooks/useGetSelectElValueCityCode";

export default function SelectPrefs({ initialPrefCode }: { initialPrefCode: string }) {
    const [cities, setCities] = useState<cityAry[]>([]);

    const { get_SelectElValue_CityCode } = useGetSelectElValueCityCode();

    // useEffect(() => {
    //     if (initialPrefCode) get_SelectElValue_CityCode(initialPrefCode);
    // }, []);

    return (
        <>
            <form>
                <select name="" id="prefLists" onChange={(event) => {
                    const newPrefCode: string = (event.target as HTMLSelectElement).value;
                    console.log(newPrefCode);
                    const resObjDataAry = get_SelectElValue_CityCode(newPrefCode);
                    resObjDataAry.then((resObjData) => setCities((_prevCities) => resObjData));
                }}>
                    {prefcodeData.map((data) => (
                        <option value={data.prefcode} key={data.prefcode}>{data.prefJaName}</option>
                    ))}
                </select>
            </form>
            <SelectCities cities={cities} />
        </>
    );
}