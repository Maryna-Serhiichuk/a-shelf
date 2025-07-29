'use client'

import { FC } from "react";
import { ArchiveBoxIcon } from '@heroicons/react/24/outline'
import { Desire } from '@/components/Desire';
import { useEffect, useState } from "react";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";
import { BargainCart } from "@/components/BargainCart";
import { Button } from "@/components/Button";
import { NavLink } from "@/components/NavLink";

export const CartLayout: FC = () => {
    const { cart } = useProviderContext()
    const [lines, setData] = useState<Array<Cartline>>([])
    const [bargains, setBargains] = useState<Array<CartBargain>>([])

    useEffect(() => {
        setData(cart?.products ?? [])
        setBargains(cart?.bargains ?? [])
    }, [cart])

    return <div className="flex flex-col gap-5 max-w-[900px]">
        {!bargains?.length && !lines?.length &&
            <div className="flex flex-col items-center pt-5 pb-10 bg-stone-100">
                <div className="opacity-15">
                    <ArchiveBoxIcon className="size-30" />
                </div>
                <div className="text-2xl opacity-90">Cart is Empty</div>
                <div className="text-lg">
                    <NavLink href={'/shop'}>
                        <Button variant="link" className="underline">
                            Pamper yourself a bit
                        </Button>
                    </NavLink>
                </div>
            </div>
        }
        {bargains?.map((bargain, index) => (
            <BargainCart key={bargain?.documentId + index} {...bargain} />
        ))}
        {lines?.map((product, index) => (
            <Desire key={product?.documentId + index} {...product} />
        ))}
    </div>
}