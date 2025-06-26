"use client"
import { memo } from "react";
import filterStyle from "../../styles/filter.module.css";
import SelectEls from "../../components/elements/SelectEls";
import FetchDataContents from "./FetchDataContents";

function FilterComponent() {
    return (
        <div className={filterStyle.FilterComponent}>
            <SelectEls isActionable />
            <FetchDataContents />
        </div>
    );
}

export default memo(FilterComponent);