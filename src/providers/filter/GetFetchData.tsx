import { createContext } from "react";
import { EstateInfoJsonDataContents } from "@/ts/estateInfoJsonData";

type Default = {
    isGetFetchData: EstateInfoJsonDataContents[];
    setGetFetchData: React.Dispatch<React.SetStateAction<EstateInfoJsonDataContents[]>>;
    isPagers: number;
    setPagers: React.Dispatch<React.SetStateAction<number>>;
    isOffSet: number;
    isCurrPager: number;
    setCurrPager: React.Dispatch<React.SetStateAction<number>>;
};

export const GetFetchDataContext = createContext({} as Default);