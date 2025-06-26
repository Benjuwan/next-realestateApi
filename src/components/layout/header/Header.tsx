"use client"
import { memo, useContext } from "react";
import baseStyles from "../../../styles/page.module.css";
import Link from "next/link";
import { GetFetchDataContext } from "../../../providers/filter/GetFetchData";
import { GetFetchEachCode } from "../../../providers/filter/GetFetchEachCode";

function Header() {
    const { setGetFetchData } = useContext(GetFetchDataContext);
    const { setGetFetchYearValue, setGetFetchQuarterValue } = useContext(GetFetchEachCode);

    /* 「Topへ」の度に取得した不動産データを初期化 */
    const resetAlreadyUseData: () => void = () => {
        setGetFetchData([]);
        setGetFetchYearValue('1999');
        setGetFetchQuarterValue('1');
    }

    return (
        <header>
            <div className={baseStyles.breadcrumbs}>
                <Link href={'/'} onClick={resetAlreadyUseData}>Topへ</Link>
            </div>
        </header>
    );
}

export default memo(Header);