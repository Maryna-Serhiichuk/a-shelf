import { FC } from "react";
import { NavLink } from "@/components/NavLink";

export const TypePreview: FC<Type> = ({ slug, category, preview, label }) => {
    return <NavLink key={slug} href={`/${category?.slug}/${slug}`}>
        <div className="flex flex-col h-60 bg-stone-100 dark:bg-stone-300">
            <div className="flex items-end justify-center grow h-[70%]">
                {preview?.url &&
                    <img className="w-100 h-[90%] object-center object-contain" src={`http://127.0.0.1:1337${preview?.url}`} alt=""/>
                }
            </div>
            <div className="py-3 text-stone-950 flex justify-center text-xl text-center">
                {label}
            </div>
        </div>
    </NavLink>
}