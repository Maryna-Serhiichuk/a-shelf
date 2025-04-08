'use client'

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/Loader";
import { TypePreview } from "@/components/TypePreview";

export const Types: FC<{ category?: string }> = ({ category }) => {
    
    const { isPending, error, data } = useQuery<Response<Array<Type>>>({
        queryKey: ['types'],
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/types?${category ? `filters[category][slug][$eq]=${category}` : ""}&populate[0]=preview&populate[1]=category`).then((res) =>
                res.json(),
            ),
    })

    if (isPending) return <Loader/>

    return <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {data?.data?.map(type => (
            <TypePreview key={type?.slug} {...type} />
        ))}
    </div>
}