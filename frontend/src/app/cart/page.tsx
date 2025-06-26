import { LayoutCategories } from "@/components/LayoutCategories";
import { CartLayout } from "@/components/CartLayout";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <LayoutCategories>
            <CartLayout/>
        </LayoutCategories>
    );
}