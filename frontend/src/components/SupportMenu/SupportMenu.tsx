'use server'

import { pageApi } from "@/api/page";
import { NavLink } from "@/components/NavLink";
import { fetchFromApi } from "@/utils/fetchFromApi"

export default async function SupportMenu () {
    const data = await fetchFromApi<Array<SupportPage>>(pageApi.endpoints.support)

    return <div className="flex flex-col gap-3 dark:text-stone-200">
        <div className="text-2xl font-medium">
            Support pages
        </div>
        <div className="w-full h-[1px] bg-stone-200 dark:bg-stone-700" />
        <nav className="flex flex-col gap-1.5 text-lg">
            {data?.data?.map(item => (
                <div key={item?.slug} className="hover:underline">
                    <NavLink href={`/support/${item?.slug}`}>
                        {item?.label}
                    </NavLink>
                </div>
            ))}
        </nav>
    </div>
}