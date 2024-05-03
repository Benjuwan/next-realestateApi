"use client"

import { prefcodeData } from "@/app/components/layout/prefcodeData";
import React, { useEffect, useState } from 'react';
import { cityAry } from "@/app/ts/cityDataAryEls";
import SelectCities from './SelectCities';
import { get_SelectElValue_CityCode } from "../../server-action/getSelectElValueCityCode";

export default function SelectPrefs({ initialPrefCode }: { initialPrefCode: string }) {
    const [cities, setCities] = useState<cityAry[]>([]);

    useEffect(() => {
        if (initialPrefCode) {
            const fetchCityCode = async () => {
                const resObjDataAry: cityAry[] = await get_SelectElValue_CityCode(initialPrefCode);
                setCities((_prevCities) => resObjDataAry);
            }
            fetchCityCode();
        }
    }, [initialPrefCode]);

    return (
        <>
            <form>
                <select name="" id="prefLists" onChange={async (event) => {
                    const newPrefCode: string = (event.target as HTMLSelectElement).value;
                    const resObjDataAry: cityAry[] = await get_SelectElValue_CityCode(newPrefCode);
                    setCities((_prevCities) => resObjDataAry);
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