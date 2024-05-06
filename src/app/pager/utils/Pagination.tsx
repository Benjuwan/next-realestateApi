import styled from "styled-components";
import { useState, useEffect, useContext, memo } from "react";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";

function Pagination({ pagerLimitMaxNum }: { pagerLimitMaxNum: number }) {
    /* 各種Context */
    const { setPagers, isOffSet, isCurrPager, setCurrPager } = useContext(GetFetchDataContext);

    /* ページ数：コンテンツデータ数をオフセットで分割した数 */
    const [isPagination, setPagination] = useState<number[]>([]);

    /* ページャー数 */
    const [isPagerNum, setPagerNum] = useState<number[]>([]);

    /* 各ページャー項目の data-pager の値に準じたページを表示及びページ番号を変更 */
    const setPaginationNum: (btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>, pagerEl: number) => void = (
        btnEl: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        pagerEl: number
    ) => {
        const dataPager: string | null = btnEl.currentTarget.getAttribute('data-pager');
        setPagers((_prevPagerNum) => Number(dataPager));
        setCurrPager((_prevCurrPager) => pagerEl); // 表示中のページ番号を変更
    }

    /* オフセット数に基づいた計算を通してページネーション用の各ページャー項目のページを設定する */
    const basedonOffsetNum_setPagerNum: () => void = () => {
        const srcAry: number[] = [];
        let srcNum: number = pagerLimitMaxNum;

        /* 各ページャー項目の data-pager の値を生成（引算用途の上限数値：srcNum が 0 を切るまでオフセット数を倍数していくループ処理）*/
        let Accumuration = 0;
        while (srcNum >= 0) {
            srcAry.push(isOffSet * Accumuration);
            Accumuration++;
            srcNum = srcNum - isOffSet;
        }
        setPagerNum((_prevPagerNum) => srcAry); // ページャー数をセット

        const paginationAry: number[] = [];
        for (let i = 1; i <= srcAry.length; i++) {
            paginationAry.push(i);
        }
        setPagination((_prevPagination) => paginationAry); // ページ数をセット
    }

    useEffect(() => {
        basedonOffsetNum_setPagerNum();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCurrPager, pagerLimitMaxNum]); // 依存配列：現在表示中のページ及びコンテンツ数の上限値

    return (
        <Paginations>
            <p id="currPage">現在「{isCurrPager}」ページ目</p>
            {isPagination.map((pagerEl, i) =>
                /* data-pager：ページャー数がセットされたカスタムデータ */
                <button key={i}
                    data-current={isCurrPager === i + 1}
                    data-pager={isPagerNum[i]}
                    onClick={(btnEl) => {
                        setPaginationNum(btnEl, pagerEl);
                    }}>
                    {pagerEl}
                </button>
            )}
        </Paginations>
    );
}

export default memo(Pagination);

const Paginations = styled.div`
width: 100%;
margin: 0 auto 1em;
display: flex;
flex-flow: row wrap;
gap: 2%;

& #currPage{
    font-size: 12px;
    width: 100%;
}

& button{
    cursor: pointer;
    appearance: none;
    border: 1px solid #dadada;
    border-radius: 0;
    background-color: #eaeaea;
    min-width: 32px;
    margin-bottom: .5em;

    &:hover{
        background-color: #333;
        color: #fff;
        border-color: #fff;
    }
}
`;