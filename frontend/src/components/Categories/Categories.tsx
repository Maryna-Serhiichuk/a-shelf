'use server'

import { productApi } from "@/api/product";
import { fetchFromApi } from "@/utils/fetchFromApi"
import { CategoriesList } from "./components/CategoriesList";

export default async function Categories() {
    const data = await fetchFromApi<Array<Category>>(productApi.endpoints.categories)
      
    return <nav className="w-full flex flex-col gap-3">
        <CategoriesList items={data?.data} />
    </nav>
}