import { SidebarItem } from "@/components/SidebarItem";
import { SidebarItemSecond } from "@/components/SidebarItemSecond";
import { Button } from "@/components/ui/button";
import { SidebarContext, SidebarSheetContext } from "@/context/Sidebar";
import { AlignJustify } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { sidebars } from "@/constants/Index";
import { sidebarItemsProps } from "@/types";

export default function Sidebar() {
    const { isExpended, setIsExpended } = useContext(SidebarContext);
    const { isSheetExpended, setIsSheetExpended } =
        useContext(SidebarSheetContext);

    const [windowWidth, setwindowWidth] = useState(window.innerWidth);

    const detectWidth = () => {
        setwindowWidth(window.innerWidth);

        if (window.innerWidth < 768) {
            setIsExpended(false);
        } else {
            setIsExpended(true);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", detectWidth);

        return () => {
            window.removeEventListener("resize", detectWidth);
        };
    }, [windowWidth]);

    const sidebarItems: sidebarItemsProps[] = sidebars();

    return (
        <aside
            className={`z-50 flex-initial overflow-y-auto w-0 sm:w-max ${isSheetExpended && "w-full"
                } `}
        >
            <nav className="h-full transition-all hidden sm:flex sm:flex-col bg-background border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    {/* <img
                        src="https://img.logoipsum.com/243.svg"
                        className={`overflow-hidden transition-all w-0  ${
                            isExpended ? "w-32" : "w-0"
                        }`}
                        alt=""
                    /> */}
                    <div
                        className={`font-extrabold lg:text-start overflow-hidden text-xl transition-all w-0  ${isExpended ? "w-32" : "w-0"
                            }`}
                    >
                        Harjaya
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsExpended(!isExpended)}
                    >
                        <AlignJustify />
                    </Button>
                </div>
                <Separator />
                <ul className="flex-1 px-3 mt-3 h-full">
                    {sidebarItems &&
                        sidebarItems.map((item, index) => (
                            <SidebarItem
                                icon={item.icon}
                                label={item.label}
                                link={item.link}
                                subMenu={item?.subMenu}
                                key={index}
                            />
                        ))}
                </ul>
            </nav>
            <nav
                className={`h-full transition-all sm:w-0 flex flex-col fixed bg-background border-r shadow-sm ${isSheetExpended ? "w-full" : "w-0 overflow-hidden"
                    }`}
            >
                <div
                    className={`p-4 pb-2 flex justify-between items-center transition-all`}
                >
                    {/* <img
                        src="https://img.logoipsum.com/243.svg"
                         className={`font-extrabold lg:text-start overflow-hidden text-xl `}
                        alt=""
                    /> */}
                    <div
                        className={`font-extrabold lg:text-start overflow-hidden text-xl`}
                    >
                        Harjaya
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsSheetExpended(!isSheetExpended)}
                    >
                        <AlignJustify />
                    </Button>
                </div>
                <Separator />
                <ul className="flex-1 px-3 mt-3">
                    {sidebarItems &&
                        sidebarItems.map((item, index) => (
                            <SidebarItemSecond
                                icon={item.icon}
                                label={item.label}
                                link={item.link}
                                subMenu={item.subMenu}
                                key={index}
                            />
                        ))}
                </ul>
            </nav>
        </aside>
    );
}
