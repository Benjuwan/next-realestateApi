import pagerStyle from "../styles/pager.module.css";
import filterStyle from "../styles/filter.module.css";
import { SyntheticEvent } from "react";

export const useViewDetails = (typeName: string) => {
    const targetModuleStyle = typeName === 'pager' ? pagerStyle : filterStyle;

    /* 詳細情報の表示機能（モーダル）*/
    const ViewDetails: (targetViewElm: SyntheticEvent<HTMLElement>) => void = (targetViewElm: SyntheticEvent<HTMLElement>) => {
        const detailsContent = targetViewElm.currentTarget.parentElement?.querySelector(`.${targetModuleStyle.details}`);
        if (detailsContent?.classList.contains(`${targetModuleStyle.OnView}`)) {
            detailsContent.classList.remove(`${targetModuleStyle.OnView}`);
        } else {
            detailsContent?.classList.add(`${targetModuleStyle.OnView}`);
        }
    }

    return { ViewDetails }
}