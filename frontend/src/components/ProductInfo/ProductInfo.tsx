import { FC } from "react";
import { FaceappSvgrepoCom, BarinstaSvgrepoCom, MetrictimeSvgrepoCom, BejeweledStarsSvgrepoCom } from "@/components/Icons"
import { IconDescriptionComponent, IconDescriptionComponentProps } from "@/components/IconDescriptionComponent";

const info: IconDescriptionComponentProps = [
    { icon: FaceappSvgrepoCom, title: 'Skin Type', description: 'Ideal for dry and sensitive skin — provides deep hydration and soothes irritation.' },
    { icon: BejeweledStarsSvgrepoCom, title: 'Effect on Skin', description: 'Reduces fine lines and improves skin elasticity for a youthful, radiant look.' },
    { icon: MetrictimeSvgrepoCom, title: 'Usage Time', description: 'Recommended for morning and evening use as part of your daily skincare routine.' },
    { icon: BarinstaSvgrepoCom, title: 'Safe', description: 'All products are dermatologically tested and certified. No animals were harmed during development.' },
]

export const ProductInfo: FC<Product> = ({}) => {
    return <div>
        <IconDescriptionComponent items={info} />
    </div>
}