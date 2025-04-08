import { FC } from "react";
import { Img } from "@/components/Img";
import { Price } from "@/components/Price";
import { Rating } from 'react-simple-star-rating'
import { Button } from "../Button";
import { Markdown } from "../Markdown";
import { Ingredients } from "../Ingredients";

const items = [
    { label: 'Glycine', description: 'Glycine is an amino acid naturally found in the skin and a key component of collagen. In cosmetics, it plays a role in maintaining skin hydration, supporting tissue regeneration, and improving elasticity. It also offers antioxidant protection, making it a valuable ingredient in soothing, anti-aging, and moisturizing formulations, especially for sensitive or stressed skin.' },
    { label: 'Glutamic acid', description: 'Glutamic acid is an amino acid that functions primarily as a humectant in cosmetic products. It helps the skin retain moisture by attracting and binding water molecules, contributing to a hydrated and smooth complexion. Additionally, it supports the skin’s natural pH balance and can improve overall skin texture, making it a useful ingredient in products designed for dry or dehydrated skin.' },
    { label: 'Lactic acid', description: 'Lactic acid is an alpha-hydroxy acid (AHA) commonly used in skincare for its exfoliating and moisturizing properties. It helps to gently remove dead skin cells, promoting cell turnover and revealing smoother, brighter skin. Lactic acid also attracts moisture to the skin, enhancing hydration, and can improve the appearance of fine lines and wrinkles. It is particularly beneficial for dry, dull, or uneven skin tone, making it a popular ingredient in exfoliating treatments and anti-aging products.' },
]

const description = `
Gel Cream is a type of moisturizer that combines the properties of a gel and a cream. It typically has a lightweight, refreshing texture similar to a gel but provides the deep hydration of a cream. Due to its formula, Gel Cream absorbs quickly into the skin without leaving a greasy residue, making it ideal for oily and combination skin types.

##### Key characteristics:\n
- Light texture that absorbs quickly.\n
- Provides hydration without leaving a greasy finish.\n
- Suitable for oily and combination skin.\n
- May contain soothing ingredients like aloe vera or herbal extracts.\n
This product is perfect for use in the summer or in humid conditions when you need to keep the skin hydrated without feeling heavy.
`

export const Product: FC<Product> = ({ documentId, name, price, type, illustration, discount, volume }) => {
    return <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] grid-rows-[400px_1fr] md:grid-rows-[600px_1fr] lg:grid-rows-[1fr] gap-[5%]">
        <div className="flex justify-center col-[1/2]">
            <Img src={illustration?.url}/>
        </div>
        <div className="flex flex-col gap-4 col-[1/2] lg:col-[2/3]">
            <div className="text-5xl font-light dark:text-stone-100">
                {name}
            </div>
            <div className="dark:text-stone-100">
                Moisturizing face cream
            </div>
            <div className="text-xl font-extralight dark:text-stone-400">
                {volume}
            </div>
            <div className="h-[1px] w-full bg-stone-300"/>
            <div className="text-3xl font-bold">
                <Price price={price} discount={discount}/>
            </div>
            <div>
                <Markdown data={description} />
            </div>
            <div className="h-[1px] w-full bg-stone-300"/>
            <div className="flex flex-col gap-2">
                <div className="dark:text-stone-300">
                    Active ingredients:
                </div>
                <div className="flex gap-4">
                    <Ingredients items={items}/>
                </div>
            </div>
            <div className="w-full">
                <Button className="w-full" size="large">
                    Add to Cart
                </Button>
            </div>
        </div>
    </div>
}