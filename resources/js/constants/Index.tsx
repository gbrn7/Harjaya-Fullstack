import { sidebarItemsProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { LayoutDashboard, ShoppingBag } from "lucide-react";


export function sidebars(): sidebarItemsProps[] {
    const { url } = usePage();

    return [
        {
            icon: <LayoutDashboard size={20} />,
            text: "Dashboard",
            link: route("dashboard"),
            isActive: url.startsWith("/dashboard"),
        },
        {
            icon: <ShoppingBag size={20} />,
            text: "Data Belanja",
            link: route("shopping"),
            isActive: url.startsWith("/shopping"),
            subMenu: [
                {
                    text: "Data Pengiriman",
                    link: route("shopping.shipments"),
                },
                {
                    text: "Data Barang",
                    link: route("shopping"),
                },
                {
                    text: "Data Tipe Barang",
                    link: route("shopping"),
                },
                {
                    text: "Data Supplier",
                    link: route("shopping"),
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
        routeName: "shopping.shipments",
    },
];
