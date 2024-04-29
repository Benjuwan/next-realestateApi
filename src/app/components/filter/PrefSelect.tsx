"use client";

import React from 'react';
import { get_SelectElValue_CityCode } from "./SelectPrefs";
import { prefcodeData } from "@/app/utils/prefcodeData";
import { cityAry } from "@/app/ts/filterType/cityDataAryEls";
import SelectCities from './SelectCities';

export default function PrefSelect() {
    const [cities, setCities] = React.useState<cityAry[]>([]);

    const handlePrefChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newPrefCode = event.target.value;
        const resObjDataAry = await get_SelectElValue_CityCode(newPrefCode);
        setCities(resObjDataAry);
    };

    return (
        <>
            <form>
                <select name="" id="prefLists" onChange={handlePrefChange}>
                    {prefcodeData.map((data) => (
                        <option value={data.prefcode} key={data.prefcode}>{data.prefJaName}</option>
                    ))}
                </select>
            </form>
            <SelectCities cities={cities} />
        </>
    );
}