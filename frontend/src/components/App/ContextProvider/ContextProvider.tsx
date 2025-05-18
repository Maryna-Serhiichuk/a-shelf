'use client'

import { createContext, FC, PropsWithChildren, useContext as use, type ReactElement } from 'react'
import { IContext } from './useContext'

export const Context = createContext<IContext>({} as IContext)

export interface WordProviderProps extends IContext {
    children: ReactElement | ReactElement[]
}

export const ContextProvider: FC<PropsWithChildren<IContext>> = ({ children , ...context }) => {
    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export const useProviderContext = () => {
    return use<IContext>(Context);
}