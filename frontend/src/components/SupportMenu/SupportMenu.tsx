'use server'

import { pageApi } from "@/api/page";
import { fetchFromApi } from "@/utils/fetchFromApi"
import { SupportMenuNav } from "./components/SupportMenuNav";

export default async function SupportMenu() {
    const data = await fetchFromApi<Array<SupportPage>>(pageApi.endpoints.support)

    return <div className="flex flex-col gap-3 dark:text-stone-200">
        <div className="hidden md:block text-2xl font-medium">
            Support pages
        </div>
        <div className="w-full h-[1px] bg-stone-200 dark:bg-stone-700" />
        <div>
            <SupportMenuNav items={data?.data} />
        </div>
        <div className="w-full h-[1px] bg-stone-200 dark:bg-stone-700" />
    </div>
}