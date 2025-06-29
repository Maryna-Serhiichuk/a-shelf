import { LayoutCategories } from "@/components/LayoutCategories";
import { Products } from "@/components/Products";

export const dynamic = 'force-dynamic';

export default async function Page({ params, searchParams }: { params: { type: string }, searchParams: { search?: string } }) {
    const { type } = await params;
    const awaitedSearchParams = await searchParams;
    const search = awaitedSearchParams?.search

    return <LayoutCategories type={type}>
        <Products type={type} search={search} />
    </LayoutCategories>
}