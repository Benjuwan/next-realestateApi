"use client"

import { createContext, ReactNode, useState, FC } from "react";
import { EstateInfoJsonDataContents } from "../../ts/estateInfoJsonData";

type Default = {
    isGetFetchData: EstateInfoJsonDataContents[];
    setGetFetchData: React.Dispatch<React.SetStateAction<EstateInfoJsonDataContents[]>>;
    isPagers: number;
    setPagers: React.Dispatch<React.SetStateAction<number>>;
    isOffSet: number;
    isCurrPager: number;
    setCurrPager: React.Dispatch<React.SetStateAction<number>>;
}
export const GetFetchDataContext = createContext({} as Default);

type fragmentType = {
    children: ReactNode;
}
export const GetFetchDataContextFragment: FC<fragmentType> = (props) => {
    const { children } = props;

    /**
     * React では参照している Context が更新された時に再レンダリングされるため、本来は機能・用途ごとにそれぞれファイルを分けて用意するべきだが今回は機能として「連携・連動している」のでまとめて記述している
    */

    /* データフェッチしたコンテンツデータの格納用配列 State */
    const [isGetFetchData, setGetFetchData] = useState<EstateInfoJsonDataContents[]>([]);

    /* ページャー数の管理用 State */
    const [isPagers, setPagers] = useState<number>(0); // 再レンダリングの度に引数に指定した数値が加算される

    /* ページャーの offset 値 */
    const [isOffSet] = useState<number>(25);

    /* 表示中のページ番号 */
    const [isCurrPager, setCurrPager] = useState<number>(1);

    return (
        <GetFetchDataContext.Provider value={{
            isGetFetchData, setGetFetchData,
            isPagers, setPagers,
            isOffSet,
            isCurrPager, setCurrPager
        }}>
            {children}
        </GetFetchDataContext.Provider>
    );
}