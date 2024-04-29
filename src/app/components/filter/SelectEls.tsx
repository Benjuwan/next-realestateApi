import selectElsStyles from "../../styles/selectEls.module.css";
import { memo } from "react";
import SelectPrefs from "./SelectPrefs";
import { SelectTerm } from "./SelectTerm";
import PrefSelect from "./PrefSelect";

function SelectEls() {
    return (
        <div className={selectElsStyles.SelectElsWrapper}>
            <div className={selectElsStyles.termEls}>
                {/* <SelectPrefs initialPrefCode="01" /> */}
                <PrefSelect />
            </div>
            <div className={selectElsStyles.termEls}>
                {/* <SelectTerm SelectTermClassName={selectElsStyles.YearsQuarterLists_From} explainSentence="計測「開始」期間" /> */}
                {/* <SelectTerm SelectTermClassName={selectElsStyles.YearsQuarterLists_To} explainSentence="計測「終了」期間" /> */}
            </div>
            <p className={selectElsStyles.termCaption}><small>※ 1:1月～3月、2:4月～6月、3:7月～10月、4:11月～12月<a href="https://www.land.mlit.go.jp/webland/api.html" target="_blank">『国土交通省　土地総合情報システム』から取得</a></small></p>
        </div>
    );
}

export default memo(SelectEls);