'use server'

import { productApi } from "@/api/product";
import { fetchFromApi } from "@/utils/fetchFromApi"
import { CategoriesList } from "./components/CategoriesList";
import { CategoriesFilter } from "./components/CategoriesFilter";

export default async function Categories() {
    const data = await fetchFromApi<Array<Category>>(productApi.endpoints.categories)

    return <CategoriesFilter>
        <CategoriesList items={data?.data} />
    </CategoriesFilter>
}