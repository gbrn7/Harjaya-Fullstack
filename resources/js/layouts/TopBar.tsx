import { useContext, useState } from "react";
import Dropdown from "@/components/Dropdown";
import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import { ModeToggle } from "@/components/mode-toggle";
import { AlignJustify, User } from "lucide-react";
import { SidebarSheetContext } from "@/context/Sidebar";
import Breadcrumbs from "@/components/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { User as userType } from "@/support/models/User";

type Topbar = {
    user: userType,
    children: React.ReactNode
    breadcrumbItems?:
    {
        label: string,
        routeName: string
    }[]
}

export default function Authenticated({ user, children, breadcrumbItems }: Topbar) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { isSheetExpended, setIsSheetExpended } =
        useContext(SidebarSheetContext);

    return (
        <div className="w-full bg-secondary overflow-x-hidden overflow-y-auto">
            <nav>
                <div className="max-w-full mx-auto px-3 sm:px-6">
                    <div className="flex items-center justify-between h-max pt-4">
                        <div className="left-content">
                            <div className="button-wrapper mb-3 block sm:hidden">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        setIsSheetExpended(!isSheetExpended)
                                    }
                                >
                                    <AlignJustify />
                                </Button>
                            </div>

                            <div className="breadcrumb-wrapper hidden sm:block">
                                <Breadcrumbs
                                    breadcrumbItems={breadcrumbItems}
                                />
                            </div>
                        </div>

                        <div className="hidden sm:flex gap-x-4 sm:items-center sm:ms-6">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md bg-secondary hover:bg-background focus:outline-none transition ease-in-out duration-150 "
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                            <ModeToggle />
                        </div>

                        <div className="-me-2 flex items-center sm:hidden gap-x-3">
                            <Button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                variant="outline"
                                size="icon"
                                className="bg-secondary hover:bg-background"
                            >
                                <User className="text-primary" />
                            </Button>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-4 pb-1">
                        <div className="px-4">
                            <div className="font-medium text-base">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="breadcrumb-wrapper px-6 block sm:hidden">
                <Breadcrumbs breadcrumbItems={breadcrumbItems} />
            </div>
            <main>{children}</main>
        </div>
    );
}
