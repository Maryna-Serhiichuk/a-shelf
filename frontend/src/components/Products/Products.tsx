'use client'

import { FC } from "react";
import { Loader } from "@/components/Loader";
import { ProductPreview } from "@/components/ProductPreview";
import { productApi } from "@/api/product";
import { accountApi } from "@/api/account";

interface ProductsArgs {
    type: string
}

export const Products: FC<ProductsArgs> = ({ type }) => {
    const { useMeQuery } = accountApi
    const { data: meData } = useMeQuery(undefined)
    const choosenProducts = meData?.products?.map(it => it?.documentId)
    const { useProductsQuery } = productApi
    const { data, isLoading, isError } = useProductsQuery({ type })

    if(isLoading) return <Loader/>

    return <div className="grid grid-cols-4 gap-5">
        {data?.data?.map(product => (
            <ProductPreview key={product?.documentId} {...product} isCart={choosenProducts?.includes(product?.documentId)} className="col-span-2 lg:col-span-1" />
        ))}
    </div>
}