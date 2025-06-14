import { FC } from "react";
import { Container } from "@/components/Container";
import { IconDescriptionComponent } from "@/components/IconDescriptionComponent";
import bottle from "@/images/toner.png"
import { IconText } from "@/components/IconText";
import classNames from "classnames";

export const OurValues: FC<IconDescriptionComponent> = ({ heading, items }) => {
    const cardWidth = "w-[250px] xl:w-[300px] 2xl:w-[400px]"
    return <section className="bg-[linear-gradient(transparent,_#AFCBC9)] dark:bg-[linear-gradient(transparent,_rgba(77,103,103,1))] pt-40">
        <Container>
            {heading &&
                <div className="text-6xl font-semibold flex justify-center dark:text-stone-100">
                    {heading}
                </div>
            }
            <div className="block lg:hidden">
                <IconDescriptionComponent items={items} />
            </div>
            <div className="hidden lg:block">
                <div>
                    <div className="flex justify-between transform-[translateY(100px)]">
                        <div className={cardWidth}>
                            {items?.[0] && <IconText {...items[0]} />}
                        </div>
                        <div className={classNames("transform-[translateY(50px)]", cardWidth)}>
                            {items?.[1] && <IconText {...items[1]} />}
                        </div>
                    </div>
                    <div className="relative flex justify-center items-center">
                        <div className="bg-stone-800 dark:bg-stone-100 opacity-30 h-[500px] w-[500px] rounded-[50%]" />
                        <div className="absolute h-full" >
                            <img src={bottle.src} className="h-full transform-[rotate(15deg)_scale(1.2)_translate(-15px,-80px)]" />
                        </div>
                    </div>
                    <div className="flex justify-between transform-[translateY(-100px)]">
                        <div className={classNames("transform-[translateY(-50px)]", cardWidth)}>
                            {items?.[2] && <IconText {...items[2]} />}
                        </div>
                        <div className={cardWidth}>
                            {items?.[3] && <IconText {...items[3]} />}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </section>
}