import { FC } from "react";
import { NavIconItem, NavIconItemArgs } from "../NavIconItem";

export interface NavigationIconItemsBarArgs {
    items: Array<NavIconItemArgs>
}

export const NavigationIconItemsBar: FC<NavigationIconItemsBarArgs> = ({ items }) => {
    return <nav className={"w-full flex flex-col gap-3"}>
        {items?.map(item => <NavIconItem key={item?.slug} { ...item } />)}
    </nav>
}