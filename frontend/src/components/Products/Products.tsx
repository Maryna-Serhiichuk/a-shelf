import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Button } from "../Button";

export const Products: FC<{ type: string }> = ({ type }) => {

    const { isPending, error, data } = useQuery<Response<Array<Product>>>({
        queryKey: ['type'],
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/products?${type ? `filters[type][slug][$eq]=${type}` : ""}&populate=illustration`).then((res) =>
                res.json(),
            ),
    })

    console.log(data)

    return <div className="grid grid-cols-4 gap-5">
        {data?.data?.map(product => (
            <div key={product?.documentId} className="flex flex-col justify-between px-6 py-6 col-span-2 lg:col-span-1 bg-stone-100 dark:bg-stone-300">
                <div className="flex items-end justify-center h-[200px]">
                    {product?.illustration?.url &&
                        <img className="w-100 h-[90%] object-center object-contain" src={`http://127.0.0.1:1337${product?.illustration?.url}`} alt=""/>
                    }
                </div>
                <div>
                    <div className="py-3 text-stone-950 flex justify-center text-xl text-center">
                        {product?.name}
                    </div>
                    <div className="font-bold pb-3 text-stone-950 flex justify-center text-xl text-center">
                        $50
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