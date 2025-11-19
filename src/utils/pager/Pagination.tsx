import { useState, useEffect, useContext, memo } from "react";
import pagerStyle from "../../styles/pager.module.css";
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
        setPagers(Number(dataPager));
        setCurrPager(pagerEl); // 表示中のページ番号を変更
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
        setPagerNum(srcAry); // ページャー数をセット

        const paginationAry: number[] = [];
        for (let i = 1; i <= srcAry.length; i++) {
            const isFinalIterTurn: boolean = i === srcAry.length;
            const currFinalPagerBtnOffset: number = srcAry.at(-1) ?? 0;
            if (isFinalIterTurn && pagerLimitMaxNum - currFinalPagerBtnOffset <= 0) {
                // 「ループ処理の最後」かつ「コンテンツがもう存在しない」（コンテンツ数と現状最終オフセット数の差が0以下になる）場合
                // 処理スキップしてページャーボタンを生成しない
                continue;
            }

            paginationAry.push(i);
        }
        setPagination(paginationAry); // ページ数をセット
    }

    useEffect(() => {
        basedonOffsetNum_setPagerNum();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCurrPager, pagerLimitMaxNum]); // 依存配列：現在表示中のページ及びコンテンツ数の上限値

    return (
        <div className={pagerStyle.Paginations}>
            <p id={pagerStyle.currPage}>現在「{isCurrPager}」ページ目</p>
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
        </div>
    );
}

export default memo(Pagination);