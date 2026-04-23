import { memo, useContext, useMemo } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

function ContentsNumber({ pagerLimitMaxNum }: { pagerLimitMaxNum: number }) {
    /* 各種 Context：ページャーのオフセットは isOffSet State で指定 */
    const { isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* PagerPages.tsx で使用する上限値の表記用変数 */
    const isCtrlPagerNum: number = useMemo(() => isPagers > pagerLimitMaxNum - isOffSet ? pagerLimitMaxNum : 0, [isPagers, pagerLimitMaxNum, isOffSet]);

    return (
        <p style={{ 'fontSize': '16px', 'textAlign': 'center', 'marginBottom': '1em' }}>
            {isPagers + 1} - {isPagers > pagerLimitMaxNum - isOffSet ? isCtrlPagerNum : isPagers + isOffSet}件 / {pagerLimitMaxNum}
        </p>
    );
}

export default memo(ContentsNumber);