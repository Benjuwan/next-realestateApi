import { createContext } from "react";

type Default = {
    isSortGraphAction: boolean;
    setSortGraphAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CompareSortGraphAction = createContext({} as Default);