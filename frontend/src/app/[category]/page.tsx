import { LayoutCategories } from "@/components/LayoutCategories";
import { Types } from "@/components/Types";

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { category: string } }) {
    const { category } = await params;

    return <LayoutCategories>
        <Types category={category}/>
    </LayoutCategories>
}
