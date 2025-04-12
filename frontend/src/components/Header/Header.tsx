'use client'

import { FC, Fragment, useState } from "react";
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Search } from "@/components/Search";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Burger } from "./components/Burger";
import classNames from "classnames";
import { NavLink } from "@/components/NavLink";
import { Auth } from "@/components/Auth";

export const Header: FC = () => {
    const [isOpen, setOpen] = useState(false)

    return <Fragment>
        <div className="w-full flex justify-between px-4 py-2">
            <Logo/>
            <div className="hidden lg:flex items-center">
                <NavLink href={'/'}>
                    <Button variant={'link'}>
                        Shop
                    </Button>
                </NavLink>
                <Button variant={'link'}>
                    About
                </Button>
                <Button variant={'link'}>
                    Contact Us
                </Button>
            </div>
            <div className="items-center hidden sm:flex">
                <Search/>
            </div>
            <div className="flex items-center">
                <div className="items-center flex sm:hidden">
                    <Button onClick={() => setOpen(!isOpen)} variant={'link'} Icon={MagnifyingGlassIcon}/>
                </div>
                <Button variant={'link'} Icon={ShoppingCartIcon}>
                    <span className="hidden lg:block">Cart</span>
                </Button>
                <Auth/>
                <NavLink href={'/account'}>
                    <Button variant={'link'} Icon={UserIcon}>
                        <span className="hidden lg:block">Account</span>
                    </Button>
                </NavLink>
                <div className="block lg:hidden">
                    <Burger />
                </div>
            </div>
        </div>
        <div className={classNames("w-full flex px-4 py-4 duration-200", "max-h-0 opacity-0", "flex sm:hidden", {
            "max-h-100 opacity-100": isOpen,
        })}>
            <Search/>
        </div>
    </Fragment>
}