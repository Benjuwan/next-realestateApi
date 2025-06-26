import { createContext } from "react";
import { thePrefCityNameType } from "@/ts/prefcode";

type contextType = {
    isGetFetchPrefCode: string;
    setGetFetchPrefCode: React.Dispatch<React.SetStateAction<string>>;
    isGetFetchCityCode: string;
    setGetFetchCityCode: React.Dispatch<React.SetStateAction<string>>;
    isGetFetchYearValue: string;
    setGetFetchYearValue: React.Dispatch<React.SetStateAction<string>>;
    isGetFetchQuarterValue: string;
    setGetFetchQuarterValue: React.Dispatch<React.SetStateAction<string>>;
    thePrefCityName: thePrefCityNameType;
    setPrefCityName: React.Dispatch<React.SetStateAction<thePrefCityNameType>>;
};

export const GetFetchEachCode = createContext({} as contextType);
