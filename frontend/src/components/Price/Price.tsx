'use client'

import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from "classnames";
import { getPriceWithDiscount } from "@/utils/getPriceWithDiscount";
dayjs.extend(relativeTime);

export const Price: FC<{ price?: number, discount?: Discount, mini?: boolean, short?: boolean }> = ({ price = 0, discount, mini = false, short = false }) => {
    return <div className={classNames("flex items-center dark:text-stone-100", {
        "gap-0": mini,
        "gap-1 xl:gap-3": !mini,
    })}>
        <div className="flex gap-x-[inherit] flex-col-reverse leading-[1.1]">
            <div>
                ${getPriceWithDiscount({ price, discount }).toFixed(2)}
            </div>
            {!short &&
                <div className={classNames("font-light flex justify-center line-through text-stone-400 dark:text-red-400", {
                    "text-sm": mini,
                    "hidden": !discount
                })}>
                    ${price.toFixed(2)}
                </div>
            }
        </div>
        {!mini &&
            <div className="flex gap-[inherit] flex-wrap group-[.discount-hidden]:hidden group-[.discount-hidden]:lg:flex text-sm">
                {discount?.interest && !short &&
                    <div className="opacity-70 bg-teal-800 dark:bg-red-800 text-stone-50 px-3 py-1 whitespace-nowrap">
                        Save {discount?.interest}%
                    </div>
                }
                {discount?.endDate && !short &&
                    <div className="bg-gray-100 px-3 py-1 font-semibold text-center border border-stone-300 text-stone-600 dark:bg-stone-600 dark:text-stone-50 whitespace-nowrap">
                        <span>Only {dayjs(discount?.endDate).fromNow()}</span>
                    </div>
                }
            </div>
        }
    </div>
}