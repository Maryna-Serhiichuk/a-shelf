import { LayoutCategories } from "@/components/LayoutCategories";
import { Products } from "@/components/Products";

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { type: string } }) {
    const { type } = await params;

    return (
        <LayoutCategories type={type}>
            <Products type={type} />
        </LayoutCategories>
    )
}
