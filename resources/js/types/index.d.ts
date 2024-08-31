import { User } from "@/support/models/User";

export interface sidebarItemsProps {
    icon: React.ReactNode,
    text: string,
    link: string,
    isActive: boolean,
    subMenu?:
    {
        text: string,
        link: string,
    }[]
}

export interface breadcrumbItems {
    breadcrumbItems?:
    {
        label: string,
        routeName: string
    }[]
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};


export interface SidebarState  {
    isExpended: Boolean,
    setIsExpended: (isExpended: Boolean) => void
}

export interface SidebarSheetState  {
    isSheetExpended: Boolean,
    setIsSheetExpended: (isSheetExpended: Boolean) => void
}

export interface AuthenticatedLayoutProps  {
    children: React.ReactNode,
    user: User,
    header: string,
    breadcrumbItems?:
    {
        label: string,
        routeName: string
    }[]
}

type SidebarType = {
    icon: React.ReactNode,
    text: string,
    isActive: boolean,
    subMenu?:
    {
        text: string,
        link: string,
    }[]
    ,
    link: string
}
