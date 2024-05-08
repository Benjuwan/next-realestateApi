"use client"

import styled from "styled-components";
import { useContext, memo, useState, useEffect } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import SelectEls from "../../components/elements/SelectEls";
import PagerComponent from "./PagerComponent";

function PagerBaseComponent() {
    const { isGetFetchData } = useContext(GetFetchDataContext);
    const [pagerLimitMaxNum, setPagerLimitMaxNum] = useState<number>(0);
    useEffect(() => {
        setPagerLimitMaxNum((_prevPagerLimitMaxNum) => isGetFetchData.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetFetchData]);

    return (
        <PagerBaseElm>
            <SelectEls isActionable />
            <PagerComponent pagerLimitMaxNum={pagerLimitMaxNum} />
        </PagerBaseElm>
    );
}

export default memo(PagerBaseComponent);

const PagerBaseElm = styled.div`
width: clamp(320px, 100%, 960px);
margin: 0 auto 3em;
`;