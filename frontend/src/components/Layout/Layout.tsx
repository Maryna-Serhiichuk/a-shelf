'use client'

import { FC, PropsWithChildren } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Poppins } from "next/font/google";
import classNames from "classnames";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return <div className={classNames("w-full h-screen flex flex-col space-between bg-stone-50 dark:bg-stone-900", poppins.className)}>
        <Header/>
        <main className="grow">
            {children}
        </main>
        <Footer/>
    </div>
}