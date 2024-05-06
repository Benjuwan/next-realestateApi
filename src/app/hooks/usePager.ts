import { useContext } from 'react';
import { GetFetchDataContext } from "../providers/filter/GetFetchData";

export const usePager = () => {
    /* 各種 Context：ページャーのオフセットは isOffSet State で指定 */
    const { isPagers, setPagers, isOffSet, isCurrPager, setCurrPager } = useContext(GetFetchDataContext);

    /* PagerPages.tsx：ページ送りver */
    const prevPagerPages: () => void = () => {
        setPagers((_prevNum) => isPagers - isOffSet);
        setCurrPager((_prevCurrPager) => isCurrPager - 1);
        window.scrollTo(0, 0);
    }

    const nextPagerPages: () => void = () => {
        setPagers((_prevNum) => isPagers + isOffSet);
        setCurrPager((_prevCurrPager) => isCurrPager + 1);
        window.scrollTo(0, 0);
    }

    return { prevPagerPages, nextPagerPages }
}