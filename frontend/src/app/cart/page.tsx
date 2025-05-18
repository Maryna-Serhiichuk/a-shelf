'use client'

import { LayoutCategories } from "@/components/LayoutCategories";
import { Desire } from '@/components/Desire';
import { useEffect, useState } from "react";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";

export default function Page() {
    const [lines, setData] = useState<Array<Cartline>>([])
    const { productsFromLocalStorage } = useProviderContext()

    useEffect(() => {
        setData(productsFromLocalStorage)
    }, [productsFromLocalStorage])

    return (
        <LayoutCategories>
            <div className="flex flex-col gap-5 max-w-[900px]">
                {lines?.map((product, index) => (
                    <Desire key={product?.documentId + index} {...product} />
                ))}
            </div>
        </LayoutCategories>
    );
}