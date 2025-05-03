'use client'

import { LayoutCategories } from "@/components/LayoutCategories";
import { Desire } from '@/components/Desire';
import { accountApi } from "@/api/account";

export default function Page() {
    const { useMeQuery } = accountApi
    const { data, isLoading, isError } = useMeQuery(undefined)

    const cartlines = data?.cartlines

    return (
        <LayoutCategories>
            <div className="flex flex-col gap-5 max-w-[900px]">
                {cartlines?.map((product, index) => (
                    <Desire key={product?.documentId + index} {...product} />
                ))}
            </div>
        </LayoutCategories>
    );
}