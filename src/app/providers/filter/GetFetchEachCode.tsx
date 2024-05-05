"use client"

import { createContext, ReactNode, useState, FC } from "react";

type contextType = {
    isGetFetchPrefCode: string;
    setGetFetchPrefCode: React.Dispatch<React.SetStateAction<string>>;
    isGetFetchCityCode: string;
    setGetFetchCityCode: React.Dispatch<React.SetStateAction<string>>;
    isGetFetchYearValue: string;
    setGetFetchYearValue: React.Dispatch<React.SetStateAction<string>>;
    isGetFetchQuarterValue: string;
    setGetFetchQuarterValue: React.Dispatch<React.SetStateAction<string>>;
}
export const GetFetchEachCode = createContext({} as contextType);

type fragmentType = {
    children: ReactNode;
}
export const GetFetchEachCodeFragment: FC<fragmentType> = (props) => {
    /**
     * React では参照している Context が更新された時に再レンダリングされるため、本来は機能・用途ごとにそれぞれファイルを分けて用意するべきだが今回は機能として「連携・連動している」のでまとめて記述している
    */

    const [isGetFetchPrefCode, setGetFetchPrefCode] = useState<string>('01'); // 北海道（01）
    const [isGetFetchCityCode, setGetFetchCityCode] = useState<string>('13102'); // 東京都中央区
    const [isGetFetchYearValue, setGetFetchYearValue] = useState<string>('1999');
    const [isGetFetchQuarterValue, setGetFetchQuarterValue] = useState<string>('1');

    return (
        <GetFetchEachCode.Provider value={{
            isGetFetchPrefCode, setGetFetchPrefCode,
            isGetFetchCityCode, setGetFetchCityCode,
            isGetFetchYearValue, setGetFetchYearValue,
            isGetFetchQuarterValue, setGetFetchQuarterValue
        }}>
            {props.children}
        </GetFetchEachCode.Provider>
    );
}