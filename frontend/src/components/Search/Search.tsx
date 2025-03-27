import { FC } from "react";
import { Input, InputArgs } from "@/components/Input";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchArgs extends InputArgs {}

export const Search: FC<SearchArgs> = (props) => {
    return <div className="border-b flex items-center gap-4 hover:border-stone-400 duration-200">
        <MagnifyingGlassIcon className="size-5"/>
        <Input {...props}/>
    </div>
}