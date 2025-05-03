'use client'

import { FC } from "react";
import { Loader } from "@/components/Loader";
import { ProductPreview } from "@/components/ProductPreview";
import { productApi } from "@/api/product";
import { useCartlines } from "@/hooks/useCartlines";

interface ProductsArgs {
    type: string
}

export const Products: FC<ProductsArgs> = ({ type }) => {
    const { carlineProductIds } = useCartlines()

    const { useProductsQuery } = productApi
    const { data, isLoading, isError } = useProductsQuery({ type })

    if(isLoading) return <Loader/>

    return <div className="grid grid-cols-4 gap-5">
        {data?.data?.map(product => (
            <ProductPreview key={product?.documentId} {...product} isCart={carlineProductIds?.includes(product?.documentId)} className="col-span-2 lg:col-span-1" />
        ))}
    </div>
}