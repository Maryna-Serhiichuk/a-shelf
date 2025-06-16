import { FC } from "react";
import { Counter, CounterArgs } from "@/components/Counter";
import { Price } from "@/components/Price";

interface CartPriceArgs extends CounterArgs {
    price?: number
    fullPrice?: number
}

export const CartPrice: FC<CartPriceArgs> = ({ value, onChange, price, fullPrice }) => {
    return <div className="flex gap-5 items-center">
        {value && onChange &&
            <div>
                <Counter value={value} onChange={onChange} />
            </div>
        }
        <div className="w-20 flex flex-col justify-end mr-3 text-xl gap-1">
            {fullPrice &&
                <div className="line-through text-stone-400">
                    <Price short price={fullPrice} />
                </div>
            }
            <div>
                <Price short price={price} />
            </div>
        </div>
    </div>
}