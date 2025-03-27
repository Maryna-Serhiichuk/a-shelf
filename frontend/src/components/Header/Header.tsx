'use client'

import { FC } from "react";
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { Search } from "@/components/Search";
import { Button } from "@/components/Button";

export const Header: FC = () => {

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
    }

    return <div className="w-full flex justify-between px-4 py-2">
        <div className="text-stone-900 dark:text-stone-50">
            A-Shelf
        </div>
        <div className="flex">
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
        <Search/>
        <div className="flex">
            <Button variant={'text'} Icon={ShoppingCartIcon}>
                Cart
            </Button>
            <Button variant={'text'} Icon={UserIcon}>
                Account
            </Button>
            <Button onClick={toggleTheme}>
                Dark
            </Button>
        </div>
    </div>
}