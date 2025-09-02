/* 親コンポーネント（SelectEls.tsx）でクライアントコンポーネントの宣言済みなので再度 "use client" は不要 */

import React, { useContext, useEffect, useState, ChangeEvent, memo, useRef } from 'react';
import selectElsStyles from "../../styles/selectEls.module.css";
import { GetFetchEachCode } from "../../providers/filter/GetFetchEachCode";
import { CityAry } from "../../ts/cityDataAryEls";
import { PrefCodeType, thePrefCityNameType } from "../../ts/prefcode";
import { prefcodeData } from "../../components/layout/prefcodeData";
import { get_SelectElValue_CityCode } from "../../server-action/getSelectElValueCityCode";

function SelectPrefCities() {
    const { isGetFetchPrefCode, setGetFetchPrefCode, setGetFetchCityCode, thePrefCityName, setPrefCityName } = useContext(GetFetchEachCode);

    const prefcodeDataRef = useRef<HTMLSelectElement | null>(null);

    const [cities, setCities] = useState<CityAry[]>([]);

    /* 都道府県名と市区町村名をセット */
    const handlePrefCityName: (e?: ChangeEvent<HTMLSelectElement>, fetchedData?: CityAry[]) => void = (
        e?: ChangeEvent<HTMLSelectElement>,
        fetchedData?: CityAry[]
    ) => {
        const isHandleCitiesCodeData: boolean = typeof e !== 'undefined' && e.target.value.length > 3;

        const targetComparePrefcode: string | undefined = isHandleCitiesCodeData ? isGetFetchPrefCode : e?.target.value;
        const prefname: PrefCodeType[] = prefcodeData.filter(pref => pref.prefcode === targetComparePrefcode);

        const targetCitiesData = fetchedData ? fetchedData : cities;
        const targetCompareCitiescode: string | undefined = isHandleCitiesCodeData ? e?.target.value : targetCitiesData[0].id; // 選択していない場合（false）は先頭の市区町村データを返す
        const cityname: CityAry[] = targetCitiesData.filter(city => city.id === targetCompareCitiescode);

        const thePrefCityName: thePrefCityNameType = {
            prefname: prefname[0].prefJaName,
            cityname: cityname[0].name,
            selectChange: true // 比較機能時において「都道府県名と市区町村名を非表示」にする
        }

        setPrefCityName(thePrefCityName);
    }

    /* 選択した市区町村及び、都道府県名と市区町村名をセット */
    const handleCityCode: (e: ChangeEvent<HTMLSelectElement>) => void = (e: ChangeEvent<HTMLSelectElement>) => {
        setGetFetchCityCode(e.target.value);
        handlePrefCityName(e);
    }

    useEffect(() => {
        /* 選択した（または初期値の）都道府県コードに準拠した（都道府県名）項目に selected を付与 */
        const prefOption = prefcodeDataRef.current?.querySelectorAll('option');
        prefOption?.forEach(option => {
            option.removeAttribute('selected');
            if (option.getAttribute('value') === isGetFetchPrefCode) {
                option.setAttribute('selected', 'true');
            }
        });

        /* 比較機能時において「都道府県名と市区町村名を非表示」にする */
        setPrefCityName({ ...thePrefCityName, selectChange: true });

        /* 選択した都道府県に準ずる市区町村のデータフェッチ及びセット処理 */
        const fetchCityCode = async () => {
            const resObjDataAry: CityAry[] | undefined = await get_SelectElValue_CityCode(isGetFetchPrefCode);
            if (typeof resObjDataAry !== "undefined") {
                setGetFetchCityCode(resObjDataAry[0].id);
                setCities(resObjDataAry);
            }
        }
        fetchCityCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetFetchPrefCode]);

    return (
        <div className={selectElsStyles.termEls}>
            <div id="prefListsWrapper">
                <select
                    name="PREF_LISTS"
                    ref={prefcodeDataRef}
                    id="PREF_LISTS"
                    onChange={async (e: ChangeEvent<HTMLSelectElement>) => {
                        const resObjDataAry: CityAry[] | undefined = await get_SelectElValue_CityCode(e.target.value);
                        setGetFetchPrefCode(e.target.value);
                        if (typeof resObjDataAry !== "undefined") {
                            setCities(resObjDataAry);
                            handlePrefCityName(e, resObjDataAry);
                        }
                    }}
                >
                    {prefcodeData.map((data) => (
                        <option value={data.prefcode} key={data.prefcode}>{data.prefJaName}</option>
                    ))}
                </select>
            </div>
            <div id="citiesListsWrapper">
                <select
                    name="CITIES_LISTS"
                    id="CITIES_LISTS"
                    onChange={handleCityCode}
                >
                    {cities.map(city => (
                        <option key={city.id} label={city.name} value={city.id}>{city.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default memo(SelectPrefCities);