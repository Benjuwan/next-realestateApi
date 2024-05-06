"use client"

import styled from "styled-components";
import { useContext, memo, useState, useEffect } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import SelectEls from "../../components/elements/SelectEls";
import PagerComponent from "./PagerComponent";

export const PagerBaseComponent = memo(() => {
    const { isGetFetchData } = useContext(GetFetchDataContext);
    const [pagerLimitMaxNum, setPagerLimitMaxNum] = useState<number>(0);
    useEffect(() => setPagerLimitMaxNum((_prevPagerLimitMaxNum) => isGetFetchData.length), [isGetFetchData]);

    return (
        <PagerBaseElm>
            <SelectEls isActionable />
            <PagerComponent pagerLimitMaxNum={pagerLimitMaxNum} />
        </PagerBaseElm>
    );
});

const PagerBaseElm = styled.div`
width: clamp(320px, 100%, 960px);
margin: 0 auto 3em;
`;