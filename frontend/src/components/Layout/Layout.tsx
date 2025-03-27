'use client'

import { FC, PropsWithChildren } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return <div className="w-full bg-stone-50 dark:bg-stone-900">
        <Header/>
        {children}
        <Footer/>
    </div>
}