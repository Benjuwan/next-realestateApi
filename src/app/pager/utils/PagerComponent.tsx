import { memo, useContext } from "react";
import pagerStyle from "../../styles/pager.module.css";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import ContentsNumber from "./ContentsNumber";
import Pagination from "./Pagination";
import PagerPages from "./PagerPages";

function PagerComponent({ pagerLimitMaxNum }: { pagerLimitMaxNum: number }) {
    const { isGetFetchData } = useContext(GetFetchDataContext);

    return (
        <>
            {isGetFetchData.length > 0 &&
                <>
                    <ContentsNumber pagerLimitMaxNum={pagerLimitMaxNum} />
                    <div className={pagerStyle.ContentWrapper}>
                        <Pagination pagerLimitMaxNum={pagerLimitMaxNum} />
                        <PagerPages pagerLimitMaxNum={pagerLimitMaxNum} />
                    </div>
                </>
            }
        </>
    );
}

export default memo(PagerComponent);