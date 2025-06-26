import { useContext, useState, useEffect, memo } from "react";
import pagerStyle from "../../styles/pager.module.css";
import { GetFetchDataContext } from "../../providers/filter/GetFetchData";
import { EstateInfoJsonDataContents } from "../../ts/estateInfoJsonData";
import HiddenDetailsContent from "../../utils/HiddenDetailsContent";
import BtnComponent from "./BtnComponent";
import { useToLocalString } from "../../hooks/useToLocalString";
import { usePager } from "../../hooks/pagers/usePager";

function PagerPages({ pagerLimitMaxNum }: { pagerLimitMaxNum: number }) {
    /* 各種Context */
    const { isGetFetchData, isPagers, isOffSet } = useContext(GetFetchDataContext);

    /* pager method */
    const { prevPagerPages, nextPagerPages } = usePager();

    /* ページャー機能：splice メソッドで処理 */
    const [isPagerContents, setPagerContents] = useState<EstateInfoJsonDataContents[]>([]);
    const setPagerContentsFrag: (fragStart: number, fragFinish: number) => void = (
        fragStart: number, // 始点（fragStart）：ページャー数
        fragFinish: number // 終点（fragFinish）：オフセット数
    ) => {
        const shallowCopy: EstateInfoJsonDataContents[] = [...isGetFetchData];
        const splicedContents: EstateInfoJsonDataContents[] = shallowCopy.splice(fragStart, fragFinish);
        setPagerContents(splicedContents);
    }

    useEffect(() => {
        /* ページャー機能：ページ送り */
        if (typeof pagerLimitMaxNum !== "undefined") {
            const limitBorderLine: number = pagerLimitMaxNum - isOffSet;
            if (isPagers >= limitBorderLine) {
                const remandNum: number = pagerLimitMaxNum - isPagers;
                setPagerContentsFrag(isPagers, remandNum); // 終点：残りのコンテンツ数
            } else {
                setPagerContentsFrag(isPagers, isOffSet);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPagers, pagerLimitMaxNum]);

    /* fee を3桁区切りに */
    const { ToLocalString } = useToLocalString();

    return (
        <>
            {isPagerContents.map((el, i) => (
                <article className={pagerStyle.PagerArticleContents} key={i}>
                    <h2>{el.Type}</h2>
                    {el.Purpose ?
                        <p>目的：{el.Purpose}</p> :
                        <p>用途：{el.Use}</p>
                    }
                    <p>￥{ToLocalString(el.TradePrice)}</p>
                    <p className={pagerStyle.districtName}>{el.Prefecture}
                        {el.Municipality && <span>{el.Municipality}</span>}
                        {el.DistrictName && <span>{el.DistrictName}</span>}
                    </p>
                    <HiddenDetailsContent aryEl={el} typeName="pager" />
                </article>
            ))}
            <div style={{ 'display': 'flex', 'gap': '5%', 'justifyContent': 'space-between', 'width': '100%', 'margin': '0 auto 4em' }}>
                <BtnComponent props={{
                    btnTxt: "PrevBtn",
                    classNameTxt: "Prev",
                    ClickEvent: prevPagerPages,
                    disabledBool: isPagers <= 0
                }} />
                <BtnComponent props={{
                    btnTxt: "NextBtn",
                    classNameTxt: "Next",
                    ClickEvent: nextPagerPages,
                    /* isPagers >= (pagerLimitMaxNum - isOffSet)：ページャー数が残りの取得予定コンテンツデータ数を超えてしまう場合は操作不可 */
                    disabledBool: isPagers >= (pagerLimitMaxNum - isOffSet)
                }} />
            </div>
        </>
    );
}

export default memo(PagerPages);