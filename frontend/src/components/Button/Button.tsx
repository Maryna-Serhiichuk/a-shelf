'use client'

import { ButtonHTMLAttributes, ComponentType, FC, PropsWithChildren } from "react";
import classNames from 'classnames';

export interface ButtonArgs extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    variant?: 'default' | 'text'
    Icon?: ComponentType<React.SVGProps<SVGSVGElement>>
}

export const Button: FC<ButtonArgs> = ({ children, variant = 'default', Icon, ...props }) => {

    const buttonType: {[key in NonNullable<ButtonArgs['variant']>]: string} = {
        text: 'text-stone-800 hover:text-stone-500 dark:text-stone-400 hover:underline px-3 py-2',
        default: 'bg-stone-800 dark:bg-stone-500 hover:bg-stone-700 dark:hover:bg-stone-600 px-7 py-2'
    }

    return <button {...props} className={classNames('cursor-pointer text-stone-50 duration-200 font-sans flex items-center gap-2', buttonType[variant])}>
        {Icon && <Icon className="size-6"/>}
        {children}
    </button>
}