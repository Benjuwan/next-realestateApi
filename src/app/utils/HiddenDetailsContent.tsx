import { memo } from "react";
import pagerStyle from "../styles/pager.module.css";
import filterStyle from "../styles/filter.module.css";
import { EstateInfoJsonDataContents } from "../ts/estateInfoJsonData";
import ContentItmes from "../components/layout/ContentItmes";
import { useViewDetails } from "../hooks/useViewDetails";

function HiddenDetailsContent({ aryEl, typeName }: { aryEl: EstateInfoJsonDataContents, typeName: string }) {
    const targetModuleStyle = typeName === 'pager' ? pagerStyle : filterStyle;

    /* 詳細情報の表示機能（モーダル）*/
    const { ViewDetails } = useViewDetails(typeName);

    return (
        <>
            <button type="button" className={targetModuleStyle.detailsViewBtn} onClick={((btnEl) => ViewDetails(btnEl.currentTarget))}>詳細情報</button>
            <div className={targetModuleStyle.details} onClick={((divEl) => ViewDetails(divEl.currentTarget))}>
                <div className={targetModuleStyle.contentsWrapper}>
                    <ContentItmes aryEl={aryEl} />
                </div>
            </div>
        </>
    );
}

export default memo(HiddenDetailsContent);