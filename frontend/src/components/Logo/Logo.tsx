'use client'

import { FC } from "react";
import { NavLink } from "@/components/NavLink";

export const Logo: FC = () => {
    // function toggleTheme() {
    //     document.documentElement.classList.toggle('dark');
    // }

    // return <div onClick={toggleTheme} className="cursor-pointer flex max-w-45 min-w-45 h-15 justify-center items-center text-stone-900 dark:text-stone-50 border relative text-2xl font-light tracking-widest">
    //     A-Shelf
    //     <div className="absolute whitespace-nowrap bg-stone-50 dark:bg-stone-900 bottom-0 left-[50%] -translate-x-1/2 translate-y-1/2 px-2 text-xs font-normal uppercase">
    //         Your cosmetics
    //     </div>
    // </div>

    return <NavLink href={'/'}>
        <div className="cursor-pointer flex max-w-45 min-w-45 h-15 justify-center items-center text-stone-900 dark:text-stone-50 border relative text-2xl font-light tracking-widest">
            A-Shelf
            <div className="absolute whitespace-nowrap bg-stone-50 dark:bg-stone-900 bottom-0 left-[50%] -translate-x-1/2 translate-y-1/2 px-2 text-xs font-normal uppercase">
                Your cosmetics
            </div>
        </div>
    </NavLink>
}