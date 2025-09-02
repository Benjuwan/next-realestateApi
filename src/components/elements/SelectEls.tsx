"use client"

import { SyntheticEvent, memo, useContext } from "react";
import selectElsStyles from "../../styles/selectEls.module.css";
import { EstateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import { GetFetchEachCode } from "../../providers/filter/GetFetchEachCode";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import SelectPrefCities from "./SelectPrefCities";
import SelectTerm from "./SelectTerm";
import { get_PrefCityYearTerm_TargetValueData } from "../../server-action/getPrefCityYearTermTargetValueData";

function SelectEls({ isActionable }: { isActionable?: boolean }) {
    const { isGetFetchCityCode, isGetFetchYearValue, isGetFetchQuarterValue } = useContext(GetFetchEachCode);

    const { isGetFetchData, setGetFetchData, setPagers, setCurrPager } = useContext(GetFetchDataContext);

    /*（既にコンテンツが表示されている場合の）ページャー（現在の表示中ページ及びページ送り数）の初期化 */
    const resetPager: () => void = () => {
        setCurrPager(1);
        setPagers(0);
    }

    return (
        <form action="" className={selectElsStyles.SelectElsWrapper} onSubmit={async (e: SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            const resObjDataAry: EstateInfoJsonDataContents[] | undefined = await get_PrefCityYearTerm_TargetValueData(isGetFetchCityCode, isGetFetchYearValue, isGetFetchQuarterValue);
            if (typeof resObjDataAry === "undefined") {
                alert('今回選択した項目・条件のデータは存在しません');
                location.reload();
                return;
            }
            if (isGetFetchData.length > 0) resetPager();
            setGetFetchData(resObjDataAry);
        }}>
            <SelectPrefCities />
            <SelectTerm props={{
                SelectTermClassName: selectElsStyles.YearsQuarterLists_From,
                explainSentence: '期間'
            }} />
            <p className={selectElsStyles.termCaption}><small>※ 1:1月～3月、2:4月～6月、3:7月～10月、4:11月～12月</small></p>
            {isActionable && <button type="submit">run</button>}
        </form>
    );
}

export default memo(SelectEls);