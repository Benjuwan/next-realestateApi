"use client"

import { ReactNode, useState, FC } from "react";
import { thePrefCityNameType } from "@/ts/prefcode";
import { GetFetchEachCode } from "./GetFetchEachCode";

type fragmentType = {
    children: ReactNode;
};

export const GetFetchEachCodeFragment: FC<fragmentType> = (props) => {
    /**
     * React では参照している Context が更新された時に再レンダリングされるため、本来は機能・用途ごとにそれぞれファイルを分けて用意するべきだが今回は機能として「連携・連動している」のでまとめて記述している
    */
    const [isGetFetchPrefCode, setGetFetchPrefCode] = useState<string>('01'); // 北海道（01）
    const [isGetFetchCityCode, setGetFetchCityCode] = useState<string>('01100'); // 北海道札幌市
    const [isGetFetchYearValue, setGetFetchYearValue] = useState<string>('1999');
    const [isGetFetchQuarterValue, setGetFetchQuarterValue] = useState<string>('1');
    const [thePrefCityName, setPrefCityName] = useState<thePrefCityNameType>({ prefname: '北海道', cityname: '札幌市' });

    return (
        <GetFetchEachCode.Provider value={{
            isGetFetchPrefCode, setGetFetchPrefCode,
            isGetFetchCityCode, setGetFetchCityCode,
            isGetFetchYearValue, setGetFetchYearValue,
            isGetFetchQuarterValue, setGetFetchQuarterValue,
            thePrefCityName, setPrefCityName
        }}>
            {props.children}
        </GetFetchEachCode.Provider>
    );
}