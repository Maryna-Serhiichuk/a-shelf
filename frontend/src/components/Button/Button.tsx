'use client'

import { ButtonHTMLAttributes, ComponentType, FC, PropsWithChildren } from "react";
import classNames from 'classnames';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export interface ButtonArgs extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    variant?: 'default' | 'text' | 'link' | 'outlined'
    size?: 'default' | 'large' | 'small'
    Icon?: ComponentType<React.SVGProps<SVGSVGElement>>,
    loading?: boolean
}

export const Button: FC<ButtonArgs> = ({ children, variant = 'default', size = 'default', Icon, loading, ...props }) => {

    const buttonType: {[key in NonNullable<ButtonArgs['variant']>]: string} = {
        link: 'text-stone-800 hover:text-stone-500 dark:text-stone-400 hover:underline px-2 sm:px-3',
        text: 'text-stone-800 hover:text-stone-600 dark:text-stone-400 dark:bg-stone-600 dark:text-stone-900 px-3',
        default: 'bg-stone-800 dark:bg-stone-500 hover:bg-stone-700 dark:hover:bg-stone-600 px-7',
        outlined: 'border border-stone-300 text-stone-900 hover:border-stone-500 hover:text-stone-700 px-7'
    }

    const buttonSize: {[key in NonNullable<ButtonArgs['size']>]: string} = {
        large: 'px-15 py-3 text-xl',
        default: 'py-2',
        small: 'px-3 py-1'
    }

    return <button {...props} disabled={loading} className={classNames(
        'flex justify-center items-center cursor-pointer text-stone-50 duration-200 font-sans gap-2 whitespace-nowrap duration-<200>', 
        buttonType[variant],
        buttonSize[size], 
        props?.className,
        { "opacity-50 cursor-cell": loading }
    )}>
        {loading && <ArrowPathIcon className="size-6 text-stone-100 animate-spin" />}
        {Icon && <Icon className="size-6"/>}
        {children}
    </button>
}