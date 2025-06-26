'use client'

import { FC, Fragment } from "react";
import { ProductView } from "@/components/ProductView";
import { ProductInfo } from "@/components/ProductInfo";
import { ProductDetails } from "@/components/ProductDetails";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";

export const Product: FC<Product> = (product) => {
    const { cart } = useProviderContext()

    return <Fragment>
        <ProductView {...product} isCart={cart?.products?.map(it => it?.product?.documentId)?.includes(product?.documentId)} />
        <ProductInfo {...product} />
        <ProductDetails {...product} />
    </Fragment>
}