import { ShoppingNavigation } from "@/components/ShoppingNavigation";
import { SidebarLayout } from "@/components/SidebarLayout";

export default function ShoppingLayout({ children }: { children: React.ReactNode }) {
    return <SidebarLayout sidebar={<ShoppingNavigation/>}>
        {children}
    </SidebarLayout>
}