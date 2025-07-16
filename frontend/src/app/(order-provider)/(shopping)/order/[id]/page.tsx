import { OrderLayout } from "@/components/OrderLayout";

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    return id ? <OrderLayout id={id}/> : null
}