import { FC } from "react";
import { Ingredients } from "@/components/Ingredients";

export const ActiveIngredients: FC<{ items?: Array<Ingredient> }> = ({ items }) => {
    if(!(items && items?.length > 0)) return null

    return <div className="flex flex-col gap-2">
        <div className="dark:text-stone-300">
            Active ingredients:
        </div>
        <div className="flex gap-2 sm:gap-4 flex-wrap">
            <Ingredients items={items} />
        </div>
    </div>
}