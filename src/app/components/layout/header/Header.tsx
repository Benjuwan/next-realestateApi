"use client"

import baseStyles from "../../../styles/page.module.css";
import { memo, useContext } from "react";
import Link from "next/link";
import { GetFetchDataContext } from "@/app/providers/filter/GetFetchData";

function Header() {
    const { setGetFetchData } = useContext(GetFetchDataContext); //「Topへ」の度に取得した不動産データを初期化

    return (
        <header>
            <div className={baseStyles.breadcrumbs}>
                <Link href={'/'} onClick={() => setGetFetchData([])}>Topへ</Link>
            </div>
        </header>
    );
}

export default memo(Header);