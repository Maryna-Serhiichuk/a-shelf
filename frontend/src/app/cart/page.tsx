'use client'

import { LayoutCategories } from "@/components/LayoutCategories";
import { Desire } from '@/components/Desire';
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";

export default function Page() {
    const [data, setData] = useState<Array<Cartline>>([])
    const { getCartProducts } = useCart()

    useEffect(() => {
        const fetchCart = async () => {
            const { data } = await getCartProducts()
            setData(data)
        }

        fetchCart()
    }, [])


    return (
        <LayoutCategories>
            <div className="flex flex-col gap-5 max-w-[900px]">
                {data?.map((product, index) => (
                    <Desire key={product?.documentId + index} {...product} />
                ))}
            </div>
        </LayoutCategories>
    );
}