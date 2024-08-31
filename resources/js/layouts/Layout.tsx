import { ThemeProvider } from "@/components/theme-provider";
import SidebarContextProvider from "@/context/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="light" storageKey="global-theme">
            <SidebarContextProvider>{children}</SidebarContextProvider>
        </ThemeProvider>
    );
}
