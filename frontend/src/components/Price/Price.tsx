'use client'

import { FC } from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from "classnames";
dayjs.extend(relativeTime);

export const Price: FC<{price?: number, discount?: Discount, mini?: boolean}> = ({ price = 0, discount, mini = false }) => {
    if(!discount || dayjs().isAfter(dayjs(discount?.endDate, 'YYYY-MM-DD'))) return '$' + price.toFixed(2)

    return <div className={classNames("flex items-center dark:text-stone-100", {
        "flex-col-reverse gap-0": mini,
        "gap-6": !mini,
    })}>
        <div className={classNames("flex flex-col sm:flex-row gap-x-[inherit]")}>
            <div>
                ${(discount?.price ? discount?.price : (price * ((100 - discount?.interest) / 100))).toFixed(2)}
            </div>
            <div className={classNames("font-light flex justify-center line-through text-red-800 dark:text-red-400", {
                "text-sm": mini
            })}>
                ${price.toFixed(2)}
            </div>
        </div>
        {!mini && discount?.interest &&
            <div className="bg-red-700 dark:bg-red-800 text-lg text-stone-50 px-5 py-2 whitespace-nowrap">
                Save {discount?.interest}%
            </div>
        }
        {!mini && discount?.endDate &&
            <div className="bg-gray-100 px-5 py-2 text-lg font-semibold text-center text-stone-600 dark:bg-stone-600 dark:text-stone-50 whitespace-nowrap">
                <span>Only {dayjs(discount?.endDate).fromNow()}</span>
            </div>
        }
    </div>
}