'use client'

import { FC, useState } from "react";
import { SparklesIcon, StarIcon, EyeDropperIcon, BeakerIcon, PaintBrushIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { Icon } from "@/components/Icon";
import { NavLink } from "@/components/NavLink";
import classNames from "classnames";

const categories = [
    {key: 'cleansing', label: 'Cleansing', Icon: SparklesIcon},
    {key: 'toning', label: 'Toning', Icon: StarIcon},
    {key: 'moisturizing', label: 'Moisturizing', Icon: EyeDropperIcon},
    {key: 'nourishing', label: 'Nourishing', Icon: BeakerIcon},
    {key: 'restoring', label: 'Restoring', Icon: PaintBrushIcon},
    {key: 'protection', label: 'Protection', Icon: HandRaisedIcon},
]


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