import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { NavLink } from "@/components/NavLink";
import { orderStatusMessages } from "@/constants/orderStatusMessages";
import classNames from "classnames";
import { Price } from "@/components/Price";
dayjs.extend(relativeTime);

export const OrderPreview: FC<Order> = ({ id, delivery_address, delivery_status, items, checkout_id, createdAt, uuid }) => {
    const totalPrice = items?.reduce((acc, cur) => {
        return acc + cur?.price * cur.quantity
    }, 0)

    return <div className="grid grid-cols-6 bg-stone-100 py-4 px-6">
        <div className="col-span-2">
            <div>
                <div className="text-sky-800 hover:text-cyan-600 inline-block underline transition">
                    <NavLink href={`/order/${uuid}`}>
                        Order №{id}
                    </NavLink>
                </div>
            </div>
            <div>
                <div className={classNames("rounded text-xs px-1 inline-block ", orderStatusMessages[delivery_status].color)}>
                    {orderStatusMessages[delivery_status].label}
                </div>
            </div>
            <div className="text-xs text-stone-400">
                {dayjs(createdAt).format('MMM DD, YYYY')}
            </div>
        </div>
        <div className="col-span-3 flex flex-col gap-2">
            <div className="font-semibold text-sm">List of Products</div>
            <div className="flex flex-col gap-1">
                {items?.map(it => {
                    if ('product' in it && it?.product) {
                        return <div key={it?.id} className="text-xs items-center">
                            <span>{it?.product?.name}</span>
                            <span className="opacity-40 text-xs">
                                <span className="ml-1">x</span>
                                <span className="ml-1">{it?.quantity}</span>
                            </span>
                        </div>
                    }
                    if ('bargain' in it && it?.bargain) {
                        return <div key={it?.id} className="text-xs items-center">
                            <span>
                                <span className="underline">{it?.bargain?.label}</span>
                            </span>
                            <span className="opacity-40 text-xs">
                                <span className="ml-1">x</span>
                                <span className="ml-1">{it?.quantity}</span>
                            </span>
                            <span>
                                {it?.bargain?.products?.map(it => (
                                    <span key={it?.id}>
                                        <br />
                                        <span>{'· '}{it?.name}</span>
                                    </span>
                                ))}
                            </span>
                        </div>
                    }
                })}
            </div>
        </div>
        <div className="col-span-1 flex justify-end items-start text-sm font-semibold">
            <Price price={totalPrice} />
        </div>
    </div>
}