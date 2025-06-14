import { FC } from "react";
import box from "@/images/box.jpg"
import stones from "@/images/stones.jpg"
import patch from "@/images/patch.jpg"
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import classNames from "classnames";
import { NavLink } from "@/components/NavLink";

export const Cta: FC<Banner> = ({ text, button }) => {
    const shadow = "shadow-[0_0_30px_rgba(0,0,0,.2)]"
    return <section className="relative bg-[linear-gradient(transparent,#D6D6D6)] pt-20 lg:pt-40">
        <Container full>
            <div className="absolute top-0">
                <img src={patch.src} className={classNames("w-[200px] lg:w-[350px]", shadow)} />
            </div>
            <div className="hidden lg:block absolute top-[70px] left-[55%]">
                <img src={stones.src} className={classNames("w-[300px]", shadow)} />
            </div>
            <div className="absolute lg:z-10 bottom-0 lg:bottom-[150px] right-0">
                <img src={box.src} className={classNames("w-[300px]", shadow)} />
            </div>
            <div className="relative z-2 flex items-center justify-center py-30 lg:py-80">
                <div className="relative max-w-[750px] lg:max-w-[950px] xl:max-w-[1200px] text-4xl lg:text-5xl/14 px-4 sm:px-8 md:pr-16">
                    <div className="absolute h-full w-full bg-stone-100 opacity-70 shadow-[0_0_20px_rgba(0,0,0,.1)]" />
                    <div className="py-6 sm:py-10 px-4 sm:px-8 flex flex-col gap-4 sm:gap-8">
                        {text &&
                            <div className="relative z-1">
                                <div>
                                    {text}
                                </div>
                            </div>
                        }
                        {button &&
                            <div className="relative z-1">
                                <NavLink href={button?.href}>
                                    <Button size="large">
                                        {button?.label}
                                    </Button>
                                </NavLink>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Container>
    </section>
}