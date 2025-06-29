'use client'

import { FC } from "react";
import { ProductPreview } from "@/components/ProductPreview";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";

export const ProductsList: FC<{ items: Maybe<Array<Product>> }> = ({ items }) => {
    const { cart } = useProviderContext()

    return items?.map(product => (
        <ProductPreview key={product?.documentId} {...product} isCart={cart?.products?.map(it => it?.product?.documentId)?.includes(product?.documentId)} className="col-span-1" />
    ))
}