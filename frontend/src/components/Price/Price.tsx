'use client'

import { FC } from "react";

export const Price: FC<{price?: number}> = ({ price = 0 }) => {
    return '$' + price.toFixed(2)
}