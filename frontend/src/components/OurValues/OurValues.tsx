import { FC } from "react";
import { Container } from "@/components/Container";
import { Pslab, Leaf, Pet, Water } from "@/components/Icons"
import { IconDescriptionComponent, IconDescriptionComponentProps } from "@/components/IconDescriptionComponent";
import bottle from "@/images/toner.png"
import { IconText } from "@/components/IconText";
import classNames from "classnames";

const info: IconDescriptionComponentProps = [
    { icon: Pslab, title: 'Gentle Formulas', description: 'We believe skincare should never compromise your skin’s natural barrier. Our products are carefully formulated to be soothing, non-irritating, and suitable for even the most sensitive skin.' },
    { icon: Leaf, title: 'Natural Ingredients', description: 'Inspired by nature, we prioritize plant-based and naturally derived ingredients. Each component is selected for its proven benefits and skin-friendly properties.' },
    { icon: Pet, title: 'Science-Backed Results', description: 'Every formula is developed with dermatological insight and tested for real, visible results. We combine modern science with timeless care to deliver products you can trust.' },
    { icon: Water, title: 'Ethical Beauty', description: 'We are proudly cruelty-free and committed to sustainability. From packaging to production, we aim to minimize our impact on the planet while prioritizing transparency and responsibility.' },
]

export const OurValues: FC = () => {
    const cardWidth = "w-[250px] xl:w-[300px] 2xl:w-[400px]"
    return <div className="bg-[linear-gradient(transparent,_#AFCBC9)] pt-40">
        <Container>
            <div className="block lg:hidden">
                <IconDescriptionComponent items={info} />
            </div>
            <div className="hidden lg:block">
                <div className="text-6xl font-semibold flex justify-center">
                    Our Values
                </div>
                <div>
                    <div className="flex justify-between transform-[translateY(100px)]">
                        <div className={cardWidth}>
                            <IconText {...info[0]} />
                        </div>
                        <div className={classNames("transform-[translateY(50px)]", cardWidth)}>
                            <IconText {...info[2]} />
                        </div>
                    </div>
                    <div className="relative flex justify-center items-center">
                        <div className="bg-stone-800 opacity-30 h-[500px] w-[500px] rounded-[50%]" />
                        <div className="absolute h-full" >
                            <img src={bottle.src} className="h-full transform-[rotate(15deg)_scale(1.2)_translate(-15px,-80px)]" />
                        </div>
                    </div>
                    <div className="flex justify-between transform-[translateY(-100px)]">
                        <div className={classNames("transform-[translateY(-50px)]", cardWidth)}>
                            <IconText {...info[1]} />
                        </div>
                        <div className={cardWidth}>
                            <IconText {...info[3]} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
}