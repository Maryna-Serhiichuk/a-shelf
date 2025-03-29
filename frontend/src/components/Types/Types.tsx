import { FC } from "react";
import gel from '@/assets/cleansing/gels/exfoliating-gel-cleanser.png'
import foam from '@/assets/cleansing/foams/deep-cleansing-foam.png'
import micelar from '@/assets/cleansing/micellar-water/gentle-micellar-water.png'
import scrub from '@/assets/cleansing/scrubs/enzyme-scrub.png'
import Image from "next/image";

const types = [
    { key: 'gels', label: 'Gels', image: gel },
    { key: 'foams', label: 'Foams', image: foam },
    { key: 'micellar-water', label: 'Micellar Water', image: micelar },
    { key: 'scrubs', label: 'Scrubs', image: scrub },
]

export const Types: FC = () => {
    return <div className="grid grid-cols-4 gap-5">
        {types?.map(type => (
            <div key={type?.key} className="flex flex-col h-60 col-span-2 lg:col-span-1 bg-stone-100 dark:bg-stone-300">
                <div className="flex items-end justify-center grow h-[70%]">
                    <Image className="h-[90%] object-center object-contain" src={type?.image} alt=""/>
                </div>
                <div className="py-3 text-stone-950 flex justify-center text-xl">
                    {type?.label}
                </div>
            </div>
        ))}
    </div>
}