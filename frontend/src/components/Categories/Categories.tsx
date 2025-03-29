'use client'

import { FC } from "react";
import { SparklesIcon, StarIcon, EyeDropperIcon, BeakerIcon, PaintBrushIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { Category } from "./components/Category";

const categories = [
    {key: 'cleansing', label: 'Cleansing', Icon: SparklesIcon},
    {key: 'toning', label: 'Toning', Icon: StarIcon},
    {key: 'moisturizing', label: 'Moisturizing', Icon: EyeDropperIcon},
    {key: 'nourishing', label: 'Nourishing', Icon: BeakerIcon},
    {key: 'restoring', label: 'Restoring', Icon: PaintBrushIcon},
    {key: 'protection', label: 'Protection', Icon: HandRaisedIcon},
]

export const Categories: FC = () => {
    return <div className="w-full flex flex-col gap-3">
        {categories?.map(({ key, label, Icon }) => (
            <button key={key} className="w-full cursor-pointer text-stone-900 dark:text-stone-300 flex items-center gap-2 text-xl">
                <Icon className="size-9"/>
                <div className="hover:underline px-2">{label}</div>
            </button>
        ))}
    </div>
}