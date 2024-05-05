import styled from "styled-components";
import { memo } from "react";

type btnType = {
    btnTxt: string;
    classNameTxt: string;
    ClickEvent: () => void;
    disabledBool?: boolean;
}

function BtnComponent({ props }: { props: btnType }) {
    const { btnTxt, classNameTxt = 'default', ClickEvent, disabledBool } = props;

    return (
        <BtnItem
            type="button"
            disabled={disabledBool}
            className={classNameTxt}
            onClick={ClickEvent}
        >
            {btnTxt}
        </BtnItem>
    );
}

export default memo(BtnComponent);

const BtnItem = styled.button`
width: 100%;
appearance: none;
border: 1px solid #333;
background-color: #fff;
border-radius: 4px;
text-align: center;
line-height: 2;

&:not([disabled]){
    cursor: pointer;
    &:hover {
        color: #fff;
        background-color: #333;
        border-color: transparent;
    }
}
`;