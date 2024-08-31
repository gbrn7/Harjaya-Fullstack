import { SidebarSheetState, SidebarState } from "@/types";
import { createContext, useContext, useState } from "react";

const initialSidebarState: SidebarState = {
    isExpended: false,
    setIsExpended: () => null
}


const initialSidebarSheetState: SidebarSheetState = {
    isSheetExpended: false,
    setIsSheetExpended: () => null
}

export const SidebarContext = createContext<SidebarState>(initialSidebarState);
export const SidebarSheetContext = createContext<SidebarSheetState>(initialSidebarSheetState);

const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isExpended, setIsExpended] = useState<Boolean>(
        () => window.innerWidth > 768 ? true : false
    );
    const [isSheetExpended, setIsSheetExpended] = useState<Boolean>(false);

    return (
        <SidebarContext.Provider value={{ isExpended, setIsExpended }}>
            <SidebarSheetContext.Provider
                value={{ isSheetExpended, setIsSheetExpended }}
            >
                {children}
            </SidebarSheetContext.Provider>
        </SidebarContext.Provider>
    );
};

export default SidebarContextProvider;
