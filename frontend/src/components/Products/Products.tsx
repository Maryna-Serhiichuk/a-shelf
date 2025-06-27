'use server'

import { productApi } from "@/api/product";
import { ProductsList } from "./components/ProductsList";
import { fetchFromApi } from "@/utils/fetchFromApi"

interface ProductsArgs { 
    type: string
    search?: string
}

export default async function Products ({ type, search: searchParams }: ProductsArgs) {
    const search = searchParams ?? undefined

    const data = await fetchFromApi<Array<Product>>(productApi.endpoints.products, { type, search })

    return <div className="grid grid-cols-4 gap-2 sm:gap-5">
        <ProductsList items={data?.data} />
    </div>
}