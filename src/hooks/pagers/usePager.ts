import { useContext } from 'react';
import { GetFetchDataContext } from '../../providers/filter/GetFetchData';

export const usePager = () => {
    /* 各種 Context：ページャーのオフセットは isOffSet State で指定 */
    const { isOffSet, setPagers, setCurrPager } = useContext(GetFetchDataContext);

    /* PagerPages.tsx：ページ送りver */
    const prevPagerPages: () => void = () => {
        setPagers(prevPager => prevPager - isOffSet);
        setCurrPager(prevCurrPager => prevCurrPager - 1);
        window.scrollTo(0, 0);
    }

    const nextPagerPages: () => void = () => {
        setPagers(prevPager => prevPager + isOffSet);
        setCurrPager(prevCurrPager => prevCurrPager + 1);
        window.scrollTo(0, 0);
    }

    return { prevPagerPages, nextPagerPages }
}