'use client'

import { LayoutCategories } from "@/components/LayoutCategories";
import { Types } from "@/components/Types";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);

    return <LayoutCategories>
        <Types category={category}/>
    </LayoutCategories>
}
