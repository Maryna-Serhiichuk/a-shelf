'use client'

import { LayoutCategories } from "@/components/LayoutCategories";
import { Desire } from '@/components/Desire';
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";

export default function Page() {
    const [lines, setData] = useState<Array<Cartline>>([])
    const { data } = useCart()

    useEffect(() => {
        setData(data)
    }, [data])

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