'use client'

import { cartApi } from "@/api/cart";
import { FC, useEffect } from "react";
import { CartWrap } from "../CartWrap";
import { CartProduct } from "../CartProduct";

interface OrderLayoutArgs {
    id: string
}

export const OrderLayout: FC<OrderLayoutArgs> = ({ id }) => {
    const { usePaymentCheckMutation, useOrderQuery } = cartApi
    const { data } = useOrderQuery({ id })
    const [checkPayment] = usePaymentCheckMutation()
    // url = https://www.sandbox.paypal.com/checkoutnow?token=8NY2429013616852G
    useEffect(() => {
        getStatus()
    }, []) // da28e793-0e6d-459d-a12a-55d5e43fecf1

    console.log(data)

    const getStatus = async () => {
        const response = await checkPayment({ id })
        // console.log(response)
    }

    const info = [
        { label: 'Order Number', value: data?.id },
        { label: 'Full Name', value: data?.delivery_address?.fullName },
        { label: 'E-mail', value: data?.delivery_address?.email },
        { label: 'Phone', value: data?.delivery_address?.phone },
        { label: 'Address', value: data?.delivery_address?.address },
        { label: 'City', value: data?.delivery_address?.city },
        { label: 'Region', value: data?.delivery_address?.region },
        { label: 'Post Code', value: data?.delivery_address?.postCode },
    ]

    return <div className="flex flex-col gap-10 max-w-[700px]">
        <div className="flex flex-col gap-3">
            {info?.map(it => (
                <div key={it?.label} className="grid grid-cols-5">
                    <div className="col-span-2 text-lg text-stone-400">
                        {it?.label}
                    </div>
                    <div className="col-span-3 text-lg">
                        {it?.value}
                    </div>
                </div>
            ))}
        </div>
        <div className="flex flex-col gap-4">
            {data?.items?.map(it => (
               <CartWrap>
                    <CartProduct {...it?.product}/>
               </CartWrap>
            ))}
        </div>
    </div>
}