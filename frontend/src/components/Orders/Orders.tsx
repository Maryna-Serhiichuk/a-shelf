'use client'

import { cartApi } from "@/api/cart";
import { FC } from "react";
import { OrderPreview } from "../OrderPreview";

export const Orders: FC = () => {
    const { useOrdersQuery } = cartApi
    const { data } = useOrdersQuery(undefined)

    return <div>
        <div className="flex flex-col gap-5">
            {data?.data?.map(order => (
                <OrderPreview key={order?.id} {...order} />
            ))}
        </div>
    </div>
}