import { FC } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container"
import classNames from "classnames";
import face from '@/images/image.png'
import { Comforter_Brush } from "next/font/google";
import { NavLink } from "@/components/NavLink";
import { Img } from "@/components/Img";
import { Decor } from "@/components/Decor";

const comforter = Comforter_Brush({ subsets: ["latin"], weight: ["400"] });

export const Hero: FC<Hero> = ({ heading, main, button }) => {
    return <Container>
        <section className="grid grid-cols-3 lg:grid-cols-2 my-2 md:my-10 gap-2 sm:gap-8">
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-8 py-[10px] sm:py-[30px] lg:py-0 xl:py-[50px]">
                <h1 className="font-bold uppercase text-3xl/10 sm:text-4xl/11 md:text-5xl/14 lg:text-6xl/20 dark:text-stone-300">
                    {heading}
                </h1>
                {button &&
                    <div>
                        <NavLink href={button?.href}>
                            <Button size="large">
                                {button?.label}
                            </Button>
                        </NavLink>
                    </div>
                }
            </div>
            <div className="col-span-1 flex justify-end gap-4 md:gap-8 h-[80%]">
                {main?.url &&
                    <div className={classNames("relative h-[80%] overflow-hidden w-[220px] rounded-[110px]")}>
                        <div className="absolute z-1 h-full w-full bg-teal-700/70 dark:bg-teal-100/70" />
                        <div className="relative z-5 h-full w-full flex justify-center items-center py-30">
                            <div className="w-[60%]">
                                <Img src={main?.url} />
                            </div>
                        </div>
                    </div>
                }
                <div className={"hidden lg:block relative top-[3%] h-[95%] overflow-hidden w-[220px] rounded-[110px]"}>
                    <div className="absolute z-1 h-full w-full bg-teal-700/30 dark:bg-teal-100/50" />
                    <div className="relative z-4 h-full w-full flex justify-center items-center">
                        <img src={face.src} className="object-cover h-full object-[top_0_left_50%]" />
                    </div>
                </div>
            </div>
            <div className="absolute top-[180px] left-13/40 ">
                <Decor/>
            </div>
        </section>
    </Container>
}