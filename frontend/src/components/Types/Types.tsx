'use client'

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "@/components/NavLink";
import { Loader } from "@/components/Loader";

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
            <NavLink key={type?.slug} href={`/${type?.category?.slug}/${type?.slug}`}>
                <div className="flex flex-col h-60 bg-stone-100 dark:bg-stone-300">
                    <div className="flex items-end justify-center grow h-[70%]">
                        {type?.preview?.url &&
                            <img className="w-100 h-[90%] object-center object-contain" src={`http://127.0.0.1:1337${type?.preview?.url}`} alt=""/>
                        }
                    </div>
                    <div className="py-3 text-stone-950 flex justify-center text-xl text-center">
                        {type?.label}
                    </div>
                </div>
            </NavLink>
        ))}
    </div>
}