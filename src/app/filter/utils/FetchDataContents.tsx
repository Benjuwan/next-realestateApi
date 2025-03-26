import { memo, useContext } from "react";
import filterStyle from "../../styles/filter.module.css";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { CityName } from "../../providers/filter/CityName";
import FilterContentsCatClick from "./FilterContentsCatClick";
import FilterActionBtns from "./FilterActionBtns";
import AverageNumber from "./AverageNumber";
import HiddenDetailsContent from "@/app/utils/HiddenDetailsContent";
import { useToLocalString } from "../../hooks/useToLocalString";

function FetchDataContents() {
    const { isGetFetchData } = useContext(GetFetchDataContext); // fetch データ
    const { isCityName } = useContext(CityName); // 都道府県・市区町村名

    /* fee を3桁区切りに */
    const { ToLocalString } = useToLocalString();

    /* h2 のスタイル */
    const headingStyle: object = {
        'fontSize': '18px',
        'textAlign': 'center',
        'fontWeight': 'normal',
        'marginBottom': '1em'
    }

    return (
        <>
            {isGetFetchData.length > 0 &&
                <>
                    <FilterActionBtns />
                    <h2 style={headingStyle}>{isCityName && <>「{isCityName}」の</>}平均取引価格「<AverageNumber />」</h2>
                    <p>件数：{isGetFetchData.length}</p>
                </>
            }
            {isGetFetchData.map((el, i) => (
                <div className={filterStyle.EachContents} key={i}>
                    <FilterContentsCatClick props={{
                        aryEl: el,
                        classNameStr: `${filterStyle.infoBtn}`
                    }} />
                    <div className={filterStyle.place}>
                        <p className={filterStyle.DistrictName}>{el.Municipality}{el.DistrictName}</p>
                        <p>￥<span className='TRADE_PRICE'>{ToLocalString(el.TradePrice)}</span></p>
                    </div>
                    <HiddenDetailsContent aryEl={el} typeName="filter" />
                </div>))}
        </>
    );
}

export default memo(FetchDataContents);