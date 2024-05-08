import { memo, useContext, useEffect, useState } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

function ContentsNumber({ pagerLimitMaxNum }: { pagerLimitMaxNum: number }) {
    /* 各種 Context：ページャーのオフセットは isOffSet State で指定 */
    const { isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* PagerPages.tsx で使用する上限値の表記用 State */
    const [isCtrlPagerNum, setCtrlPagerNum] = useState<number>(0);

    useEffect(() => {
        /* 次ページのコンテンツ数がオフセット数を下回っている場合は上限値をセット */
        if (isPagers > pagerLimitMaxNum - isOffSet) {
            setCtrlPagerNum((_prevCtrlPagerNum) => pagerLimitMaxNum);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPagers]);

    return (
        <p style={{ 'fontSize': '16px', 'textAlign': 'center', 'marginBottom': '1em' }}>
            {isPagers + 1} - {isPagers > pagerLimitMaxNum - isOffSet ? isCtrlPagerNum : isPagers + isOffSet}件 / {pagerLimitMaxNum}
        </p>
    );
}

export default memo(ContentsNumber);