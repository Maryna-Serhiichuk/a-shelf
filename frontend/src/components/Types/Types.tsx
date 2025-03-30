'use client'

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import gel from '@/assets/cleansing/gels/exfoliating-gel-cleanser.png'
import foam from '@/assets/cleansing/foams/deep-cleansing-foam.png'
import micelar from '@/assets/cleansing/micellar-water/gentle-micellar-water.png'
import scrub from '@/assets/cleansing/scrubs/enzyme-scrub.png'

const types = [
    { key: 'gels', label: 'Gels', image: gel },
    { key: 'foams', label: 'Foams', image: foam },
    { key: 'micellar-water', label: 'Micellar Water', image: micelar },
    { key: 'scrubs', label: 'Scrubs', image: scrub },
]

export const Types: FC<{ category?: string }> = ({ category }) => {
    
    const { isPending, error, data } = useQuery<Response<Array<Type>>>({
        queryKey: ['type'],
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/types?${category ? `filters[category][slug][$eq]=${category}` : ""}&populate=preview`).then((res) =>
                res.json(),
            ),
    })

    return <div className="grid grid-cols-4 gap-5">
        {data?.data?.map(type => (
            <div key={type?.slug} className="flex flex-col h-60 col-span-2 lg:col-span-1 bg-stone-100 dark:bg-stone-300">
                <div className="flex items-end justify-center grow h-[70%]">
                    {type?.preview?.url &&
                        <img className="w-100 h-[90%] object-center object-contain" src={`http://127.0.0.1:1337${type?.preview?.url}`} alt=""/>
                    }
                </div>
                <div className="py-3 text-stone-950 flex justify-center text-xl text-center">
                    {type?.label}
                </div>
            </div>
        ))}
    </div>
}