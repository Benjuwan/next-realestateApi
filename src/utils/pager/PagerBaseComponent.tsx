"use client"
import { useContext, memo, useMemo } from "react";
import pagerStyle from "../../styles/pager.module.css";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import SelectEls from "../../components/elements/SelectEls";
import PagerComponent from "./PagerComponent";

function PagerBaseComponent() {
    const { isGetFetchData } = useContext(GetFetchDataContext);
    const pagerLimitMaxNum: number = useMemo(() => isGetFetchData.length, [isGetFetchData]);

    return (
        <div className={pagerStyle.PagerBaseElm}>
            <SelectEls isActionable />
            <PagerComponent pagerLimitMaxNum={pagerLimitMaxNum} />
        </div>
    );
}

export default memo(PagerBaseComponent);