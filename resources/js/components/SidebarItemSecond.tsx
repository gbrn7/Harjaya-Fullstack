import { useContext, useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import { SidebarSheetContext } from "@/context/Sidebar";
import { sidebarItemsProps } from "@/types";

export function SidebarItemSecond({ icon, label, subMenu, link }: sidebarItemsProps) {
    const { isSheetExpended } = useContext(SidebarSheetContext);
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(url.startsWith(new URL(link).pathname) ? true : false);

    return (
        <>
            {subMenu ? (
                <li
                    className={`relative items-center my-1 font-medium rounded-md cursor-pointer transition-all group ${isOpen && "bg-muted/50"
                        }`}
                >
                    <div
                        className={`flex py-2 px-3 rounded-md hover:bg-accent ${url.startsWith(new URL(link).pathname) && "bg-accent"
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="icon-wrapper w-5">{icon}</div>
                        <div
                            className={`overflow-hidden flex justify-between sidebar-item-text ml-3 transition-all w-full truncate`}
                        >
                            <span>{label}</span>

                            <ChevronDown
                                className={`transition-all duration-300 ${isOpen && "rotate-180"
                                    }`}
                            />
                        </div>
                    </div>
                    {isSheetExpended && isOpen && (
                        <ul className="subMenuWrapper ">
                            {subMenu.map((item, index) => (
                                <li
                                    className={`pl-11 py-2
                         hover:bg-accent truncate ${url.startsWith(new URL(item.link).pathname) && "bg-accent"
                                        }`}
                                    key={index}
                                >
                                    <Link href={item.link} className="block">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ) : (
                <li
                    className={`relative items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all group  ${url.startsWith(new URL(link).pathname) ? "bg-accent text-primary" : "hover:bg-accent"
                        }`}
                >
                    <Link className="flex" href={link}>
                        <div className="icon-wrapper">{icon}</div>
                        <span
                            className={`overflow-hidden sidebar-item-text ml-3 transition-all w-full truncate`}
                        >
                            {label}
                        </span>

                        {!isSheetExpended && (
                            <div
                                className={`absolute left-full rounded-md px-2 text-nowrap border py-1 ml-6 bg-background text-sm transition-all text-primary invisible opacity-20 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible hover:bg-accent`}
                            >
                                {label}
                            </div>
                        )}
                    </Link>
                </li>
            )}
        </>
    );
}
