'use client'

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { Price } from "../Price";
import { NavLink } from "../NavLink";
import { Img } from "../Img";

export const Products: FC<{ type: string }> = ({ type }) => {

    const { isPending, error, data } = useQuery<Response<Array<Product>>>({
        queryKey: ['products'],
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/products?${type ? `filters[type][slug][$eq]=${type}` : ""}&populate=illustration`).then((res) =>
                res.json(),
            ),
    })

    if(isPending) return <Loader/>

    return <div className="grid grid-cols-4 gap-5">
        {data?.data?.map(product => (
            <div key={product?.documentId} className="flex flex-col justify-between px-6 py-6 col-span-2 lg:col-span-1 bg-stone-100 dark:bg-stone-300">
                <div className="flex items-end justify-center h-[200px]">
                    {product?.illustration?.url &&
                        <Img src={product?.illustration?.url} />    
                    }
                </div>
                <div>
                    <NavLink href={`/product/${product?.name?.replaceAll(' ', '-')}/${product?.documentId}`}>
                        <div className="py-3 text-stone-950 flex justify-center text-xl text-center hover:underline cursor-pointer">
                            {product?.name}
                        </div>
                    </NavLink>
                    <div className="font-bold pb-3 text-stone-950 flex justify-center text-xl text-center">
                        <Price price={product?.price} />
                    </div>
                    <div className="flex justify-center">
                        <Button>
                            Add to Card
                        </Button>
                    </div>
                </div>
            </div>
        ))}
    </div>
}