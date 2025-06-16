import { FC, useEffect, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export interface CounterArgs {
    onChange?: (count: number) => void, 
    value?: Cartline['quantity']
}

export const Counter: FC<CounterArgs> = ({ onChange, value }) => {
    const [count, setCount] = useState<number>(value ?? 1)

    useEffect(() => {
        value && setCount(value)
    }, [value])

    useEffect(() => {
        onChange && onChange(count)
    }, [count])

    const counter = {
        decrement: () => { count > 1 && setCount(count - 1) },
        increment: () => { setCount(count + 1) },
    }

    return <div className='inline-flex gap-3 items-center py-1 px-3 border dark:border-stone-500 opacity-40 hover:opacity-100 dark:text-stone-200 duration-200'>
        <button className="hover:bg-stone-200 dark:hover:bg-stone-500 rounded-lg duration-100" onClick={counter.decrement}>
            <MinusIcon height={20} />
        </button>
        <div>
            {count}
        </div>
        <button className="hover:bg-stone-200 dark:hover:bg-stone-500 rounded-lg duration-100" onClick={counter.increment}>
            <PlusIcon height={20} />
        </button>
    </div>
}