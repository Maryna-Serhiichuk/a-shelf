import { FC } from "react";
import { Container } from "@/components/Container";
import { Img } from "@/components/Img";

export const Formula: FC<ImageShortDescription> = ({ title, description, left, right }) => {
    return <Container>
        <div className="relative grid grid-cols-8 md:grid-cols-3 md:h-[300px] lg:h-[500px] xl:h-[700px] gap-8 lg:gap-15 items-center my-10 md:my-40">
            {title &&
                <div className="block md:hidden col-span-8 relative z-3 text-3xl">
                    <div className="flex justify-center font-semibold text-center">
                        {title}
                    </div>
                </div>
            }
            <div className="col-span-3 md:col-span-1 h-2/3">
                <Img src={left?.url} className="relative z-2 left-1/4 h-full object-cover drop-shadow-[0_0_20px_rgba(0,0,0,.3)]" />
            </div>
            <div className="col-span-5 md:col-span-1 h-[200px] md:h-full">
                <Img src={right?.url} className="relative h-full right-1/5 md:right-0 object-cover drop-shadow-[0_0_20px_rgba(0,0,0,.3)]" />
            </div>
            <div className="hidden md:block col-span-4 md:col-span-1 text-xl lg:text-2xl">
                {title &&
                    <div className="relative z-3 text-3xl lg:text-6xl/18 sm:w-[125%] sm:left-[-25%] top-[-20px] lg:top-[-60px]">
                        {title}
                    </div>
                }
                {description &&
                    <div>
                        {description}
                    </div>
                }
            </div>
            {description &&
                <div className="block md:hidden col-span-8">
                    {description}
                </div>
            }
        </div>
    </Container>
}