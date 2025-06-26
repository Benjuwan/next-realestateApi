"use client"

import { ReactNode, useState, FC } from "react";
import { CityName } from "./CityName";

type fragmentType = {
    children: ReactNode;
};

export const CityNameFragment: FC<fragmentType> = (props) => {
    const [isCityName, setCityName] = useState<string>('');

    return (
        <CityName.Provider value={{ isCityName, setCityName }}>
            {props.children}
        </CityName.Provider>
    );
}