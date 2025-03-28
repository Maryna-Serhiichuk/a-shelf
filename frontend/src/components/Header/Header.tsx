'use client'

import { FC, Fragment, useState } from "react";
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Search } from "@/components/Search";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Burger } from "./components/Burger";
import classNames from "classnames";

export const Header: FC = () => {
    const [isOpen, setOpen] = useState(false)

    return <Fragment>
        <div className="w-full flex justify-between px-4 py-2">
            <Logo/>
            <div className="hidden lg:flex">
                <Button variant={'text'}>
                    Shop
                </Button>
                <Button variant={'text'}>
                    About
                </Button>
                <Button variant={'text'}>
                    Contact Us
                </Button>
            </div>
            <div className="items-center hidden sm:flex">
                <Search/>
            </div>
            <div className="flex items-center">
                <div className="items-center flex sm:hidden">
                    <Button onClick={() => setOpen(!isOpen)} variant={'text'} Icon={MagnifyingGlassIcon}/>
                </div>
                <Button variant={'text'} Icon={ShoppingCartIcon}>
                    <span className="hidden lg:block">Cart</span>
                </Button>
                <Button variant={'text'} Icon={UserIcon}>
                    <span className="hidden lg:block">Account</span>
                </Button>
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