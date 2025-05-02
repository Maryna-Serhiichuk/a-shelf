'use client'

import { FC } from "react";
import { Loader } from "@/components/Loader";
import { ProductPreview } from "@/components/ProductPreview";
import { productApi } from "@/api/product";

interface ProductsArgs {
    type: string
}

export const Products: FC<ProductsArgs> = ({ type }) => {
    const { useProductsQuery } = productApi
    const { data, isLoading, isError } = useProductsQuery({ type })

    if(isLoading) return <Loader/>

    return <div className="grid grid-cols-4 gap-5">
        {data?.data?.map(product => (
            <ProductPreview key={product?.documentId} {...product} className="col-span-2 lg:col-span-1" />
        ))}
    </div>
}