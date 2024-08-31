import { breadcrumbItems } from "@/types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";

export default function Breadcrumbs({ breadcrumbItems }: breadcrumbItems) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    {route().current("dashboard") ? (
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink href={route("dashboard")}>
                            Dashboard
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
                {!!breadcrumbItems &&
                    breadcrumbItems.map((breadcrumb, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {route().current(breadcrumb.routeName) ? (
                                    <BreadcrumbPage>
                                        {breadcrumb.label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink
                                        href={route(`${breadcrumb.routeName}`)}
                                    >
                                        {breadcrumb.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
