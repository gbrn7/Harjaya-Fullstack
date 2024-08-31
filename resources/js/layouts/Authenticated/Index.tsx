import Sidebar from "./SidebarLayout";
import Authenticated from "../TopBar";
import { Toaster } from "@/components/ui/sonner";
import { Head } from "@inertiajs/react";
import { AuthenticatedLayoutProps } from "@/types";



export default function AuthenticatedLayout({
    children,
    user,
    header,
    breadcrumbItems,
}: AuthenticatedLayoutProps) {
    return (
        <div className="flex">
            <Sidebar />
            <Head title={header} />
            <Authenticated user={user} breadcrumbItems={breadcrumbItems}>
                <div className="content-wrapper h-screen px-3 sm:px-6 py-3">
                    {children}
                </div>
            </Authenticated>
            <Toaster />
        </div>
    );
}
