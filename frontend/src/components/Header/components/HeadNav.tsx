import { FC } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/Button";

export const HeadNav: FC = () => {
    return <nav className="group-[.burger]:block flex items-center">
        <NavLink href={'/shop'}>
            <Button variant={'link'}>
                Shop
            </Button>
        </NavLink>
        <NavLink href={'/about'}>
            <Button variant={'link'}>
                About
            </Button>
        </NavLink>
        <NavLink href={'/contact'}>
            <Button variant={'link'}>
                Contact Us
            </Button>
        </NavLink>
    </nav>
}