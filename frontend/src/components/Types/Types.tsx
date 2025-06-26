'use server'

import { productApi } from "@/api/product";
import { TypePreview } from "@/components/TypePreview";
import { fetchFromApi } from "@/utils/fetchFromApi"

export default async function Types ({ category }: { category?: string }) {
    const data = await fetchFromApi<Array<Type>>(productApi.endpoints.types, { category })

    return <nav className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {data?.data?.map(type => (
            <TypePreview key={type?.slug} {...type} />
        ))}
    </nav>
}