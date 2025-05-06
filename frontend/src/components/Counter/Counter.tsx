import { FC, useEffect, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

export const Counter: FC<{ onChange?: (count: number) => void, value?: Cartline['quantity'] }> = ({ onChange, value }) => {
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

    return <div className='inline-flex gap-3 items-center py-1 px-3 border opacity-40 hover:opacity-100 duration-200'>
        <button className="hover:bg-stone-200 rounded-lg duration-100" onClick={counter.decrement}>
            <MinusIcon height={20} />
        </button>
        <div>
            {count}
        </div>
        <button className="hover:bg-stone-200 rounded-lg duration-100" onClick={counter.increment}>
            <PlusIcon height={20} />
        </button>
    </div>
}