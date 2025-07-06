'use client'

import { FC } from "react";
import { Desire } from '@/components/Desire';
import { useEffect, useState } from "react";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";
import { BargainCart } from "@/components/BargainCart";
import { CartContextProvider } from "./context/CartContextProvider";
import { useBuy } from "./context/useBuy";
import { BuyDrawer } from "./components/BuyDrawer";


export const CartLayout: FC = () => {
    const { cart } = useProviderContext()
    const [lines, setData] = useState<Array<Cartline>>([])
    const [bargains, setBargains] = useState<Array<CartBargain>>([])

    const context = useBuy()

    useEffect(() => {
        setData(cart?.products ?? [])
        setBargains(cart?.bargains ?? [])
    }, [cart])

    return <CartContextProvider {...context}>
        <div className="flex flex-col gap-5 max-w-[900px]">
            {bargains?.map((bargain, index) => (
                <BargainCart key={bargain?.documentId + index} {...bargain} />
            ))}
            {lines?.map((product, index) => (
                <Desire key={product?.documentId + index} {...product} />
            ))}
            <BuyDrawer/>
        </div>
    </CartContextProvider>
}