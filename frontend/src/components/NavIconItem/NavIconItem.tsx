'use client'

import { FC } from "react";
import { usePathname } from 'next/navigation'
import { Icon, IconTypeProp } from "@/components/Icon";
import { NavLink } from "@/components/NavLink";
import classNames from "classnames";

export interface NavIconItemArgs {
    slug: string
    icon: IconTypeProp
    label: string
}

export const NavIconItem: FC<NavIconItemArgs> = ({ slug, icon, label }) => {
    const pathname = usePathname()
    const isHere = pathname.endsWith(slug)

    return <NavLink href={slug}>
        <button key={slug} className={classNames("w-full cursor-pointer text-stone-900 dark:text-stone-300 flex items-center gap-2 text-xl", {
            "underline": isHere
        })}>
            <Icon type={icon} className="size-9" />
            <div className="hover:underline px-2">{label}</div>
        </button>
    </NavLink>
}