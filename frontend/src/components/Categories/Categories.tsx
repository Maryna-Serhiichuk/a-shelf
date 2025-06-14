'use client'

import { FC } from "react";
import { Category } from "./components/Category";
import { productApi } from "@/api/product";

export const Categories: FC = () => {
    const { useCategoriesQuery } = productApi
    const { data, isLoading, isError } = useCategoriesQuery(undefined)
      
    return <nav className="w-full flex flex-col gap-3">
        {data?.data?.map(category => (
            <Category key={category?.slug} {...category} />
        ))}
    </nav>
}