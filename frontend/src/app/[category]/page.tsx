'use client'

import { Bargain } from "@/components/Bargain";
import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { LayoutCategories } from "@/components/LayoutCategories";
import { Types } from "@/components/Types";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);

    return <LayoutCategories>
        <Types category={category}/>
    </LayoutCategories>
}
