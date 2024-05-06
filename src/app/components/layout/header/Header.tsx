"use client"

import { memo, useContext } from "react";
import Link from "next/link";
import { GetFetchDataContext } from "@/app/providers/filter/GetFetchData";

function Header() {
    const { setGetFetchData } = useContext(GetFetchDataContext); //「Topへ」の度に取得した不動産データを初期化

    return (
        <header>
            <Link href={'/'} onClick={() => setGetFetchData([])}>Topへ</Link>
        </header>
    );
}

export default memo(Header);