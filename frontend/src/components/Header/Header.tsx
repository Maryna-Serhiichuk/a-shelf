'use client'

import { ChangeEvent, FC, Fragment, useCallback, useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Search } from "@/components/Search";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Burger } from "./components/Burger";
import classNames from "classnames";
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { HeadNav } from "@/components/Header/components/HeadNav";
import { PersonNav } from "./components/PersonNav";

export const Header: FC = () => {
    const router = useRouter();
    const param = useParams()
    const searchParams = useSearchParams();

    const [isOpen, setOpen] = useState(false)

    const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('search', e.target.value);
        if (!param?.type) {
            router.push(`/shop?${params.toString()}`);
        } else {
            router.push(`?${params.toString()}`);
        }

    }, [router, searchParams]);

    return <Fragment>
        <header className="w-full flex justify-between px-4 py-2">
            <Logo />
            <div className="hidden lg:flex">
                <HeadNav />
            </div>
            <div className="items-center hidden sm:flex">
                <Search onChange={onSearch} />
            </div>
            <div className="flex items-center">
                <div className="items-center flex sm:hidden">
                    <Button onClick={() => setOpen(!isOpen)} variant={'link'} Icon={MagnifyingGlassIcon} />
                </div>
                <PersonNav />
                <div className="block lg:hidden">
                    <Burger />
                </div>
            </div>
        </header>
        <div className={classNames("w-full flex px-4 py-4 duration-200", "max-h-0 opacity-0", "flex sm:hidden", {
            "max-h-100 opacity-100": isOpen,
        })}>
            <Search onChange={onSearch} />
        </div>
    </Fragment>
}