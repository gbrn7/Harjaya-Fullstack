import { useContext, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { SidebarContext } from "@/context/Sidebar";
import { ChevronDown } from "lucide-react";
import { sidebarItemsProps } from "@/types";

export function SidebarItem({ icon, label, subMenu, link }: sidebarItemsProps) {
    const { isExpended } = useContext(SidebarContext);
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
                            className={`overflow-hidden flex justify-between sidebar-item-text transition-all w-0 truncate ${isExpended ? "w-48 ml-3" : "w-0"
                                }`}
                        >
                            <span>{isExpended && label}</span>
                            {isExpended && (
                                <ChevronDown
                                    className={`transition-all duration-300 ${isOpen && "rotate-180"
                                        }`}
                                />
                            )}
                        </div>
                        {!isExpended && (
                            <div
                                className={`absolute left-full w-44 rounded-md bg-background border text-nowrap ml-6 text-sm transition-all text-primary invisible opacity-20 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible`}
                            >
                                <ul className="floatSubemenuWrapper">
                                    {subMenu.map((item, index) => (
                                        <li
                                            className={`py-2 truncate px-3 hover:bg-accent rounded-md ${url.startsWith(new URL(item.link).pathname) && "bg-accent"
                                                }`}
                                            key={index}
                                        >
                                            <Link
                                                href={item.link}
                                                className="block truncate"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {isExpended && isOpen && (
                        <ul className="subMenuWrapper ">
                            {subMenu.map((item, index) => (
                                <li
                                    className={`pl-11 py-2
                         hover:bg-accent truncate ${url.startsWith(new URL(item.link).pathname) && "bg-accent"
                                        }`}
                                    key={index}
                                >
                                    <Link href={item.link} className="block truncate">
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
                            className={`overflow-hidden sidebar-item-text transition-all w-0 ${isExpended ? "w-48 ml-3" : "w-0"
                                }`}
                        >
                            {isExpended && label}
                        </span>

                        {!isExpended && (
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
