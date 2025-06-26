"use client"

import { ReactNode, useState, FC } from "react";
import { CompareSortGraphAction } from "./CompareSortGraphAction";

type fragmentType = {
    children: ReactNode;
};

export const CompareSortGraphActionFragment: FC<fragmentType> = ({ children }) => {
    const [isSortGraphAction, setSortGraphAction] = useState<boolean>(true);

    return (
        <CompareSortGraphAction.Provider value={{
            isSortGraphAction, setSortGraphAction
        }}>
            {children}
        </CompareSortGraphAction.Provider>
    );
}