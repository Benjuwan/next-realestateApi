"use client"

import styled from "styled-components";
import { useContext, memo, useEffect, useState } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { estateInfoJsonDataContents } from "@/app/ts/estateInfoJsonData";
import SelectEls from "../../components/elements/SelectEls";
import PagerComponent from "./PagerComponent";
import { get_PrefCityYearTerm_TargetValueData } from "@/app/server-action/getPrefCityYearTermTargetValueData";

export const PagerBaseComponent = memo(() => {
    const { isGetFetchData, setGetFetchData } = useContext(GetFetchDataContext);

    const [pagerLimitMaxNum, setPagerLimitMaxNum] = useState<number>(0);

    // useEffect(() => {
    //     const fetchTargetValueData = async () => {
    //         const resObjDataAry: estateInfoJsonDataContents[] = await get_PrefCityYearTerm_TargetValueData();
    //         setPagerLimitMaxNum((_prevPagerLimitMaxNum) => resObjDataAry.length);
    //         setGetFetchData((_prevGetFetchData) => resObjDataAry);
    //     }
    //     fetchTargetValueData();
    // }, [isGetFetchData]);

    return (
        <PagerBaseElm>
            <SelectEls />
            <PagerComponent props={{ pagerLimitMaxNum: pagerLimitMaxNum }} />
        </PagerBaseElm>
    );
});

const PagerBaseElm = styled.div`
width: clamp(320px, 100%, 960px);
margin: 0 auto 3em;
`;