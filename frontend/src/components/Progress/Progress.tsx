'use client'

import { FC } from "react";
import NextTopLoader from 'nextjs-toploader';

export const Progress: FC = () => {
    return <NextTopLoader
        color="linear-gradient(to right, rgb(6, 182, 212), rgb(45, 212, 191), rgb(15, 118, 110))"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
    />
}