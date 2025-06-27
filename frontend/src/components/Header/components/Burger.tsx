'use client'

import { Auth } from "@/components/Auth";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ButtonHTMLAttributes, FC, Fragment, useState } from "react";

import { HeadNav } from "./HeadNav";
import { Drawer } from "@/components/Drawer";

export const Burger: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const [open, setOpen] = useState(false)
    // const router = useRouter();

    // useEffect(() => {
    //     console.log(router.asPath)
    //     if (open) {
    //         setOpen(false);
    //     }
    // }, [router.asPath]);

    const onClose = () => {
        setOpen(false)
    }

    const onOpen = () => {
        setOpen(true)
    }

    return <Fragment>
        <Button {...props} variant={'link'} Icon={Bars3Icon} onClick={onOpen} />
        <Drawer open={open} onClose={setOpen}>
            <div className="flex justify-between px-4 sm:px-4 pb-5">
                <Logo />
                <Button variant="text" onClick={onClose}>
                    <XMarkIcon className="size-6" />
                </Button>
            </div>
            <div className="h-[1px] bg-stone-200 w-full" />
            <div className="relative mt-2 flex-1 px-4 sm:px-6 group burger">
                <HeadNav />
                <Auth />
            </div>
        </Drawer>
    </Fragment>
}