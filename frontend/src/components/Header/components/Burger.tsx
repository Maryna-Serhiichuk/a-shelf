'use client'

import { Button } from "@/components/Button";
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ButtonHTMLAttributes, FC, Fragment } from "react";

export const Burger: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return <Fragment>
        
        <Button {...props} variant={'text'} Icon={Bars3Icon}/>
    </Fragment>
}