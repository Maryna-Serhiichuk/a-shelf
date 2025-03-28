'use client'

import { FC } from "react";
import { Input, InputArgs } from "@/components/Input";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchArgs extends InputArgs {}

export const Search: FC<SearchArgs> = (props) => {
    return <div className="py-2 border-b flex items-center gap-4 hover:border-stone-400 duration-200 dark:border-stone-400 dark:hover:border-stone-500">
        <MagnifyingGlassIcon className="size-5 dark:text-stone-400"/>
        <Input {...props}/>
    </div>
}