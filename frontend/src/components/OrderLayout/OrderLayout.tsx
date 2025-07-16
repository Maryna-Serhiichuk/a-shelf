'use client'

import { cartApi } from "@/api/cart";
import { CheckBadgeIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { CartWrap } from "@/components/CartWrap";
import { CartProduct } from "@/components/CartProduct";
import { Price } from "@/components/Price";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import { Button } from "../Button";

interface OrderLayoutArgs {
    id: string
}
// url = https://www.sandbox.paypal.com/checkoutnow?token=8NY2429013616852G
export const OrderLayout: FC<OrderLayoutArgs> = ({ id }) => {
    const searchParams = useSearchParams()
    const status = searchParams.get('status')

    const { usePaymentCheckMutation, useOrderQuery } = cartApi
    const { data } = useOrderQuery({ id })
    const [checkPayment] = usePaymentCheckMutation()

    // if(!data) return null // redirect to cart

    useEffect(() => {
        getStatus()
    }, []) // da28e793-0e6d-459d-a12a-55d5e43fecf1

    // console.log(data)

    const getStatus = async () => {
        const response = await checkPayment({ id })
        // console.log(response)
    }

    const statuses: { [key in OrderStatus]: PropsWithChildren['children'] } = {
        created: data?.checkout_id ? <Link className="text-sky-600 underline" href={`https://www.sandbox.paypal.com/checkoutnow?token=${data?.checkout_id}`}>
            Pending Payment
        </Link> : 'Not Paid',
        processing: "Processing",
        delivering: "Delivering",
        delivered: "Delivered",
        void: "The order is unpaid" // create again
    }



    const info = data ? [
        { label: 'Status', value: statuses[data.delivery_status] },
        { label: 'Order Number', value: data?.id },
        { label: 'Full Name', value: data?.delivery_address?.fullName },
        { label: 'E-mail', value: data?.delivery_address?.email },
        { label: 'Phone', value: data?.delivery_address?.phone },
        { label: 'Address', value: data?.delivery_address?.address },
        { label: 'City', value: data?.delivery_address?.city },
        { label: 'Region', value: data?.delivery_address?.region },
        { label: 'Post Code', value: data?.delivery_address?.postCode },
    ] : []

    const total = useMemo(() => {
        return data?.items?.reduce((acc, current) => {
            return acc + current.price * current.quantity
        }, 0) ?? 0
    }, [data])

    const isSuccess = status === 'success' && data?.delivery_status === 'processing'
    const isCancel = status === 'cancel' && data?.delivery_status === 'created'

    return <div className="flex flex-col gap-10 max-w-[700px] pb-30">
        {(isSuccess || isCancel) &&
            <div>
                {isSuccess &&
                    <div className="flex justify-center items-center gap-2 bg-green-100 rounded-lg py-2">
                        <CheckBadgeIcon className="size-8" />
                        <div>Your order has been paid and is awaiting processing</div>
                    </div>
                }
                {isCancel &&
                    <div className="flex justify-center items-center gap-2 bg-amber-100 rounded-lg py-2">
                        <ExclamationCircleIcon className="size-8" />
                        <div className="max-w-[80%] text-ce">Payment was canceled, but you can still pay using the provided link. It will remain active for 72 hours.</div>
                    </div>
                }
            </div>
        }
        <div className="flex flex-col gap-3">
            {info?.map(it => (
                <div key={it?.label} className="grid grid-cols-5">
                    <div className="col-span-2 text-lg text-stone-400">
                        {it?.label}
                    </div>
                    <div className="col-span-3 text-lg break-all">
                        {it?.value}
                    </div>
                </div>
            ))}
        </div>
        <div>
            <div className="flex flex-col gap-4">
                {data?.items?.map(it => (
                    <CartWrap key={it?.id}>
                        <CartProduct size={120} {...it?.product} price={it?.price} discount={undefined} quantity={it.quantity} />
                        <div className="flex align-middle text-2xl font-medium">
                            <Price price={it.price * it.quantity} />
                        </div>
                    </CartWrap>
                ))}
            </div>
            <div className="text-3xl font-mediun border-t border-stone-300 flex justify-end pt-4 mt-8">
                <Price price={total} />
            </div>
            <div className="flex justify-end border-t border-stone-300 pt-4 mt-4">
                <Button size="large">
                    Checkout Now Again
                </Button>
            </div>
        </div>
    </div>
}