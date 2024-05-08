"use client"

import styled from "styled-components";
import { memo } from "react";
import SelectEls from "../../components/elements/SelectEls";
import FetchDataContents from "./FetchDataContents";

function FilterComponent() {
    return (
        <Contents>
            <SelectEls isActionable />
            <FetchDataContents />
        </Contents>
    );
}

export default memo(FilterComponent);

const Contents = styled.div`
width: clamp(320px, 100%, 960px);
margin: 0 auto 3em;

& button {
    cursor: pointer;
    appearance: none;
    border-radius: 4px;
    border: 1px solid transparent;
    line-height: 2;
}
`;