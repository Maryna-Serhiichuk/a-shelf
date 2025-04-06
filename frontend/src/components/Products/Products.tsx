'use client'

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Loader } from "@/components/Loader";
import { ProductPreview } from "@/components/ProductPreview";

export const Products: FC<{ type: string }> = ({ type }) => {

    const { isPending, error, data } = useQuery<Response<Array<Product>>>({
        queryKey: ['products'],
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/products?${type ? `filters[type][slug][$eq]=${type}` : ""}&populate[0]=illustration&populate[1]=discount`).then((res) =>
                res.json(),
            ),
    })

    if(isPending) return <Loader/>

    return <div className="grid grid-cols-4 gap-5">
        {data?.data?.map(product => (
            <ProductPreview key={product?.documentId} {...product} />
        ))}
    </div>
}