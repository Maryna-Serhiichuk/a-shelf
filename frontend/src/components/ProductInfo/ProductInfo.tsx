import { FC } from "react";
import { Container } from "@/components/Container";
import { FaceappSvgrepoCom, BarinstaSvgrepoCom, MetrictimeSvgrepoCom, BejeweledStarsSvgrepoCom } from "@/components/Icons"

const info = [
    { icon: FaceappSvgrepoCom, title: 'Skin Type', description: 'Ideal for dry and sensitive skin — provides deep hydration and soothes irritation.' },
    { icon: BejeweledStarsSvgrepoCom, title: 'Effect on Skin', description: 'Reduces fine lines and improves skin elasticity for a youthful, radiant look.' },
    { icon: MetrictimeSvgrepoCom, title: 'Usage Time', description: 'Recommended for morning and evening use as part of your daily skincare routine.' },
    { icon: BarinstaSvgrepoCom, title: 'Safe', description: 'All products are dermatologically tested and certified. No animals were harmed during development.' },
]

export const ProductInfo: FC<Product> = ({}) => {
    return <div>
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-5 lg:gap-20 cursor-default">
                {info?.map(({ icon: Icon, ...it }) => (
                    <div key={it?.title} className="flex flex-row items-center sm:flex-col gap-3 grid-span-1">
                        <div className="flex justify-center">
                            <Icon fontSize={100} />
                        </div>
                        <div className="flex flex-col gap-1 sm:gap-[inherit]">
                            <div className="text-left sm:text-center text-xl font-bold">
                                {it?.title}
                            </div>
                            <div className="text-left sm:text-center">
                                {it?.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    </div>
}