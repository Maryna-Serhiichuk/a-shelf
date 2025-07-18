'use client'

import { FC } from "react";
import { NavigationIconItemsBar, NavigationIconItemsBarArgs } from "@/components/NavigationIconItemsBar";

export const CategoriesList: FC<{ items: Maybe<Array<Category>> }> = ({ items }) => {
    const caregoriesNavigation: NavigationIconItemsBarArgs['items'] = items?.map(category => ({
        label: category?.label ?? '',
        slug: category?.slug ?? '',
        icon: category?.icon ?? 'map_pin'
    })) ?? []

    return <NavigationIconItemsBar items={caregoriesNavigation}/>
}