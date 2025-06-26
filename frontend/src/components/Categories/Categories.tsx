'use server'

import { Category } from "./components/Category";
import { productApi } from "@/api/product";
import { fetchFromApi } from "@/utils/fetchFromApi"

export default async function Categories() {
    const data = await fetchFromApi<Array<Category>>(productApi.endpoints.categories)
      
    return <nav className="w-full flex flex-col gap-3">
        {data?.data?.map(category => (
            <Category key={category?.slug} {...category} />
        ))}
    </nav>
}