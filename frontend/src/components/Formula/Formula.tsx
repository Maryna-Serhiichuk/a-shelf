import { FC } from "react";
import sand from "@/images/sand.jpg"
import stone from "@/images/stone.jpg"

export const Formula: FC = () => {
    return <div className="relative grid grid-cols-3 h-[700px] gap-15 items-center my-40">
        <div className="col-span-1 h-2/3">
            <img src={sand.src} className="relative z-2 left-1/4 h-full object-cover drop-shadow-[0_0_20px_rgba(0,0,0,.3)]" />
        </div>
        <div className="col-span-1 h-full">
            <img src={stone.src} className="h-full object-cover drop-shadow-[0_0_20px_rgba(0,0,0,.3)]" />
        </div>
        <div className="col-span-1 text-2xl">
            <div className="relative z-3 text-6xl/18 w-[125%] left-[-25%] top-[-60px]">
                Formulated with natural ingredients
            </div>
            <div>
                This means the product avoids synthetic chemicals and artificial additives, instead using plant-based, mineral or other naturally occurring substances
            </div>
        </div>
    </div>
}