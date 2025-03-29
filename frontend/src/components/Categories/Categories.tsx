'use client'

import { FC } from "react";
import { Category } from "./components/Category";
import { useQuery } from '@tanstack/react-query'

export const Categories: FC = () => {
    const { isPending, error, data } = useQuery<Response<Array<Category>>>({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('http://127.0.0.1:1337/api/categories').then((res) =>
                res.json(),
            ),
    })
      
    return <div className="w-full flex flex-col gap-3">
        {data?.data?.map(category => (
            <Category key={category?.slug} {...category} />
        ))}
    </div>
}