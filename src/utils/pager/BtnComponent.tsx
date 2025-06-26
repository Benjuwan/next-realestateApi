import { memo } from "react";
import pagerStyle from "../../styles/pager.module.css";

type BtnType = {
    btnTxt: string;
    classNameTxt: string;
    ClickEvent: () => void;
    disabledBool?: boolean;
}

function BtnComponent({ props }: { props: BtnType }) {
    const { btnTxt, classNameTxt = 'default', ClickEvent, disabledBool } = props;

    return (
        <button
            type="button"
            disabled={disabledBool}
            className={`${pagerStyle.BtnItem} ${classNameTxt}`}
            onClick={ClickEvent}
        >
            {btnTxt}
        </button>
    );
}

export default memo(BtnComponent);