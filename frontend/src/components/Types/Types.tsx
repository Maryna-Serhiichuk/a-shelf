'use client'

import { FC } from "react";
import { productApi } from "@/api/product";
import { Loader } from "@/components/Loader";
import { TypePreview } from "@/components/TypePreview";

export const Types: FC<{ category?: string }> = ({ category }) => {
    const { useTypesQuery } = productApi
    const { data, isLoading, isError } = useTypesQuery({ category })

    if (isLoading) return <Loader/>

    return <nav className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {data?.data?.map(type => (
            <TypePreview key={type?.slug} {...type} />
        ))}
    </nav>
}