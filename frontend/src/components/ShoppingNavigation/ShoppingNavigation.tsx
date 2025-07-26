import { FC } from "react";
import { NavIconItemArgs } from "@/components/NavIconItem";
import { NavigationIconItemsBar } from "@/components/NavigationIconItemsBar";

const navigation: Array<{ label: string, slug: string, icon: NavIconItemArgs['icon'] }> = [
    { label: 'Shop', slug: '/shop', icon: 'building_storefront' },
    { label: 'Wishlist', slug: '/cart', icon: 'heart' },
    { label: 'Orders', slug: '/orders', icon: 'shopping_bag' },
]

export const ShoppingNavigation: FC = () => {
    return <NavigationIconItemsBar items={navigation}/>
}