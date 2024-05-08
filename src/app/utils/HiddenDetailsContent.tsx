import { memo } from "react";
import { EstateInfoJsonDataContents } from "../ts/estateInfoJsonData";
import ContentItmes from "../components/layout/ContentItmes";
import { useViewDetails } from "../hooks/useViewDetails";

function HiddenDetailsContent({ aryEl }: { aryEl: EstateInfoJsonDataContents }) {
    /* 詳細情報の表示機能（モーダル）*/
    const { ViewDetails } = useViewDetails();

    return (
        <>
            <button type="button" className="detailsViewBtn" onClick={((btnEl) => ViewDetails(btnEl.currentTarget))}>詳細情報</button>
            <div className="details" onClick={((divEl) => ViewDetails(divEl.currentTarget))}>
                <div className="contentsWrapper">
                    <ContentItmes aryEl={aryEl} />
                </div>
            </div>
        </>
    );
}

export default memo(HiddenDetailsContent);