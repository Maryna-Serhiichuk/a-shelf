import { FC } from "react";
import { IconDescriptionComponent } from "@/components/IconDescriptionComponent";

const info: IconDescriptionComponent['items'] = [
    { illustration: 'face', heading: 'Skin Type', description: 'Ideal for dry and sensitive skin — provides deep hydration and soothes irritation.' },
    { illustration: 'diamond', heading: 'Effect on Skin', description: 'Reduces fine lines and improves skin elasticity for a youthful, radiant look.' },
    { illustration: 'clock', heading: 'Usage Time', description: 'Recommended for morning and evening use as part of your daily skincare routine.' },
    { illustration: 'glass', heading: 'Safe', description: 'All products are dermatologically tested and certified. No animals were harmed during development.' },
]

export const ProductInfo: FC<Product> = ({}) => {
    return <div>
        <IconDescriptionComponent items={info} />
    </div>
}