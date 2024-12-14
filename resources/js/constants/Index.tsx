import { sidebarItemsProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { LayoutDashboard, ShoppingBag } from "lucide-react";

export const ROUTES = {
    SHIPMENTS: 'shopping.shipments'
}


export function sidebars(): sidebarItemsProps[] {

    return [
        {
            icon: <LayoutDashboard size={20} />,
            label: "Dashboard",
            link: route("dashboard")
        },
        {
            icon: <ShoppingBag size={20} />,
            label: "Data Belanja",
            link: route("shopping"),
            subMenu: [
                {
                    label: "Data Pengiriman",
                    link: route("shopping.shipments.index"),
                },
                {
                    label: "Data Barang",
                    link: route("shopping.goods.index"),
                },
                {
                    label: "Data Tipe Barang",
                    link: route("shopping.goods-types.index"),
                },
                {
                    label: "Data Supplier",
                    link: route("shopping.suppliers.index"),
                },
            ],
        },
    ];
}

export const DashboardBreadcrumbs = [
    {
        label: "Profile",
        routeName: "profile.edit",
    },
];

export const ProfileBreadcrumbs = [
    {
        label: "Profile",
        routeName: "profile.edit",
    },
];

export const DataBelanjaBreadcrumbs = [
    {
        label: "Data Belanja",
        routeName: "shopping",
    },
    {
        label: "Data Pengirirman",
        routeName: "shopping.shipments.index",
    },
];
