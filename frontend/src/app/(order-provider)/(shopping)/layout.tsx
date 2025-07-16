import { SidebarLayout } from "@/components/SidebarLayout";
import { ToShopButton } from "@/components/ToShopButton";

export default function ShoppingLayout({ children }: { children: React.ReactNode }) {
    return <SidebarLayout sidebar={<ToShopButton />}>
        {children}
    </SidebarLayout>
}