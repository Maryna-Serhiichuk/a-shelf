'use client'

import { createContext, FC, PropsWithChildren, useContext as use, type ReactElement } from 'react'
import { IBuyContext } from './useBuy'

export const Context = createContext<IBuyContext>({} as IBuyContext)

export interface CartProviderProps extends IBuyContext {
    children: ReactElement | ReactElement[]
}

export const CartContextProvider: FC<PropsWithChildren<IBuyContext>> = ({ children , ...context }) => {
    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export const useCartProviderContext = () => {
    return use<IBuyContext>(Context);
}