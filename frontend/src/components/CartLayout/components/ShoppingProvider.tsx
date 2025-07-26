'use client'

import { FC, PropsWithChildren } from "react";
import { useBuy } from "@/components/CartLayout/context/useBuy";
import { CartContextProvider } from "@/components/CartLayout/context/CartContextProvider";
import { BuyDrawer } from "./BuyDrawer";

export const ShoppingProvider: FC<PropsWithChildren> = ({ children }) => {
    const context = useBuy()
    
    return <CartContextProvider {...context}>
        {children}
        <BuyDrawer />
    </CartContextProvider>
}