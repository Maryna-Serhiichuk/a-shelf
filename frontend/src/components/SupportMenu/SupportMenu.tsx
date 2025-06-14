import { FC } from "react";
import { pageApi } from "@/api/page";
import { NavLink } from "@/components/NavLink";

export const SupportMenu: FC = () => {
    const { useSupportQuery } = pageApi
    const { data } = useSupportQuery(undefined)

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