'use client'

import { FC } from "react";
import { Desire } from '@/components/Desire';
import { useEffect, useState } from "react";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";
import { BargainCart } from "@/components/BargainCart";


export const CartLayout: FC = () => {
    const { cart } = useProviderContext()
    const [lines, setData] = useState<Array<Cartline>>([])
    const [bargains, setBargains] = useState<Array<CartBargain>>([])

    useEffect(() => {
        setData(cart?.products ?? [])
        setBargains(cart?.bargains ?? [])
    }, [cart])

    return <div className="flex flex-col gap-5 max-w-[900px]">
        {bargains?.map((bargain, index) => (
            <BargainCart key={bargain?.documentId + index} {...bargain} />
        ))}
        {lines?.map((product, index) => (
            <Desire key={product?.documentId + index} {...product} />
        ))}
    </div>
}