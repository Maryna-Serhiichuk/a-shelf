'use client'

import { FC, Fragment } from "react";
import Slider from "react-slick"
import { NavLink } from "@/components/NavLink";

export const SupportMenuNav: FC<{ items: Maybe<Array<SupportPage>> }> = ({ items }) => {
    return <Fragment>
        <nav className="hidden md:flex flex-col gap-1.5 text-lg">
            {items?.map(item => (
                <div key={item?.slug} className="hover:underline">
                    <NavLink href={`/support/${item?.slug}`}>
                        {item?.label}
                    </NavLink>
                </div>
            ))}
        </nav>
        <nav className="relative block md:hidden w-full">
            <Slider infinite={false} speed={500} variableWidth>
                {items?.map(item => (
                    <div key={item?.slug} className="hover:underline px-2 underline decoration-gray-300 underline-offset-6">
                        <NavLink href={`/support/${item?.slug}`}>
                            {item?.label}
                        </NavLink>
                    </div>
                ))}
            </Slider>
            <div className="absolute top-0 right-0 w-[50px] h-full shadow-[inset_-30px_0px_10px_-10px_var(--color-stone-50)] md:shadow-none"/>
            <div className="absolute top-0 left-0 w-[50px] h-full shadow-[inset_15px_0px_10px_-10px_var(--color-stone-50)] md:shadow-none"/>
        </nav>
    </Fragment>
}