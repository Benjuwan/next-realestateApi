"use client"
import { useContext, memo, useState, useEffect } from "react";
import pagerStyle from "../../styles/pager.module.css";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import SelectEls from "../../components/elements/SelectEls";
import PagerComponent from "./PagerComponent";

function PagerBaseComponent() {
    const { isGetFetchData } = useContext(GetFetchDataContext);
    const [pagerLimitMaxNum, setPagerLimitMaxNum] = useState<number>(0);
    useEffect(() => {
        setPagerLimitMaxNum(isGetFetchData.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetFetchData]);

    return (
        <div className={pagerStyle.PagerBaseElm}>
            <SelectEls isActionable />
            <PagerComponent pagerLimitMaxNum={pagerLimitMaxNum} />
        </div>
    );
}

export default memo(PagerBaseComponent);