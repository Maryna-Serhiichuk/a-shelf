'use client'

import { FC } from "react";
import { Category } from "./Category";

export const CategoriesList: FC<{ items: Maybe<Array<Category>> }> = ({ items }) => {
    return items?.map(category => (
        <Category key={category?.slug} {...category} />
    ))
}