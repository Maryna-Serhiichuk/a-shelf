import { FC } from "react";
import { Counter, CounterArgs } from "@/components/Counter";
import { Price } from "@/components/Price";

interface CartPriceArgs extends CounterArgs {
    price?: number
    fullPrice?: number
}

export const CartPrice: FC<CartPriceArgs> = ({ value, onChange, price, fullPrice }) => {
    return <div className="flex gap-5 items-center flex-col-reverse lg:flex-row">
        {value && onChange &&
            <div>
                <Counter value={value} onChange={onChange} />
            </div>
        }
        <div className="w-20 flex flex-col justify-end lg:mr-3 text-xl md:text-2xl gap-1">
            {fullPrice &&
                <div className="text-end line-through text-stone-400">
                    <Price short price={fullPrice} />
                </div>
            }
            <div className="text-end">
                <Price short price={price} />
            </div>
        </div>
    </div>
}