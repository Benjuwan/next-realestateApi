import { createContext } from "react";

type contextType = {
    isCityName: string;
    setCityName: React.Dispatch<React.SetStateAction<string>>;
};

export const CityName = createContext({} as contextType);