import { FC } from "react";
import box from "@/images/box.jpg"
import stones from "@/images/stones.jpg"
import patch from "@/images/patch.jpg"
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const Cta: FC = () => {
    return <div className="relative bg-[linear-gradient(transparent,#D6D6D6)] pt-40">
        <Container>
            <div className="absolute top-0">
                <img src={patch.src} className="w-[350px]" />
            </div>
            <div className="absolute top-[70px] left-[55%]">
                <img src={stones.src} className="w-[300px]" />
            </div>
            <div className="absolute bottom-[150px] right-0">
                <img src={box.src} className="w-[300px]" />
            </div>

            <div className="relative z-2 flex items-center justify-center py-80">
                <div className="flex flex-col gap-8 max-w-[950px] text-5xl/14 pr-16">
                    <div>
                        Revitalize your skin and reveal a natural glow that radiates your inner beauty every day with our nourishing formulas
                    </div>
                    <div>
                        <Button size="large">
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    </div>
}