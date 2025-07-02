import { CartLayout } from "@/components/CartLayout";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ToShopButton } from "@/components/ToShopButton";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <SidebarLayout sidebar={<ToShopButton/>}>
            <CartLayout />
        </SidebarLayout>
    );
}