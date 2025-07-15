import { OrderLayout } from "@/components/OrderLayout";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ToShopButton } from "@/components/ToShopButton";

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    // const data = await fetchFromApi<SupportPage>(pageApi.endpoints.page, { slug: page })

    return <SidebarLayout sidebar={<ToShopButton />}>
        {id && <OrderLayout id={id}/>}
    </SidebarLayout>
}