'use client'

import { FC, PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkArgs {
    href: Maybe<string>
    onChange?: (isActive: boolean) => void
}

export const NavLink: FC<PropsWithChildren<NavLinkArgs>> = ({ href, children, onChange }) => {

    if(!href) return children

    const pathname = usePathname();
    const cleanHref = href.startsWith("/") ? href.slice(1) : href;
    const [isActive, setActive] = useState(false)

    useEffect(() => {
        setActive(pathname === href || pathname === "/" + cleanHref)
    }, [])

    useEffect(() => {
        onChange && onChange(isActive)
    }, [isActive])

    return <Link href={href} className={isActive ? "active" : ""}>
        {children}
    </Link>
}