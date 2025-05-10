import { FC } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container"
import classNames from "classnames";
import product from '@/images/water.png'
import face from '@/images/image.png'
import { Comforter_Brush } from "next/font/google";
import { NavLink } from "@/components/NavLink";

const comforter = Comforter_Brush({ subsets: ["latin"], weight: ["400"] });

export const Hero: FC = () => {
    return <Container>
        <div className="grid grid-cols-2 my-20">
            <div className="col-span-1 flex flex-col gap-8 py-[70px]">
                <div className="text-6xl/20 font-bold uppercase">
                    We don't just sell cosmetics. We help skin live healthy
                </div>
                <div>
                    <NavLink href={'/'}>
                        <Button size="large">
                            Get Start
                        </Button>
                    </NavLink>
                </div>
            </div>
            <div className="col-span-1 flex justify-end gap-8 h-[80%]">
                <div className={classNames("relative h-[80%] overflow-hidden w-[220px] rounded-[110px]")}>
                    <div className="absolute z-1 h-full w-full bg-teal-700/70" />
                    <div className="relative z-5 h-full w-full flex justify-center items-center py-30">
                        <img src={product.src} className="w-[60%]" />
                    </div>
                </div>
                <div className={classNames("relative top-[3%] h-[95%] overflow-hidden w-[220px] rounded-[110px]")}>
                    <div className="absolute z-1 h-full w-full bg-teal-700/30" />
                    <div className="relative z-4 h-full w-full flex justify-center items-center">
                        <img src={face.src} className="object-cover h-full object-[top_0_left_50%]" />
                    </div>
                </div>
            </div>
            <div className={classNames("absolute z-3 text-right select-none tracking-[60px] text-teal-800 opacity-10 text-[250px]/55 top-[180px] left-13/40 transform-[rotate(5deg)]", comforter.className)}>
                <div>Facial</div>
                <div>Natural</div>
            </div>
        </div>
    </Container>
}