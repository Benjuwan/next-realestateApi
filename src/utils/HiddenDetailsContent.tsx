import { memo, useState } from "react";
import pagerStyle from "../styles/pager.module.css";
import filterStyle from "../styles/filter.module.css";
import { EstateInfoJsonDataContents } from "../ts/estateInfoJsonData";
import ContentItmes from "../components/layout/ContentItmes";

function HiddenDetailsContent({ aryEl, typeName }: { aryEl: EstateInfoJsonDataContents, typeName: string }) {
    const targetModuleStyle = typeName === 'pager' ? pagerStyle : filterStyle;

    const [isOnview, setOnview] = useState<boolean>(false);
    const handleViewDetails: () => void = () => setOnview(!isOnview);

    return (
        <>
            <button type="button" className={isOnview ? `${targetModuleStyle.detailsViewBtn} ${targetModuleStyle.OnView}` : targetModuleStyle.detailsViewBtn} onClick={handleViewDetails}>詳細情報</button>
            <div className={isOnview ? `${targetModuleStyle.details} ${targetModuleStyle.OnView}` : targetModuleStyle.details} onClick={handleViewDetails}>
                <div className={targetModuleStyle.contentsWrapper}>
                    <ContentItmes aryEl={aryEl} />
                </div>
            </div>
        </>
    );
}

export default memo(HiddenDetailsContent);