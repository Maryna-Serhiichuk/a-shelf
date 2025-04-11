import { FC, Fragment } from "react";
import { ProductView } from "@/components/ProductView";
import { ProductInfo } from "@/components/ProductInfo";
import { ProductDetails } from "@/components/ProductDetails";

export const Product: FC<Product> = (product) => {
    return <Fragment>
        <ProductView {...product} />
        <ProductInfo {...product} />
        <ProductDetails {...product} />
    </Fragment>
}