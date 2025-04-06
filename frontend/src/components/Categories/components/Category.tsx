'use client'

import { FC, useState } from "react";
import { Icon } from "@/components/Icon";
import { NavLink } from "@/components/NavLink";
import classNames from "classnames";

export const Category: FC<Category> = ({ documentId, label, slug, icon }) => {
    const [isActive, setActive] = useState(false)
    
    return <NavLink href={`/${slug}`} onChange={setActive}>
        <button key={slug} className={classNames("w-full cursor-pointer text-stone-900 dark:text-stone-300 flex items-center gap-2 text-xl", {
             "underline": isActive
        })}>
            <Icon type={icon} className="size-9"/>
            <div className="hover:underline px-2">{label}</div>
        </button>
    </NavLink>
}