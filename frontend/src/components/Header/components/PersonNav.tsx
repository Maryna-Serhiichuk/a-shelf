import { FC, Fragment } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/Button";
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Auth } from "@/components/Auth";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";

export const PersonNav: FC = () => {
    const { cart } = useProviderContext()
    const quantity = (cart?.products?.length ?? 0) + (cart?.bargains?.length ?? 0)

    return <Fragment>
        <nav className="relative">
            <NavLink href={'/cart'}>
                {quantity && quantity > 0 &&
                    <div className="absolute left-6 flex justify-center items-center text-sm h-[20px] w-[20px] bg-red-700 rounded-[50%] text-stone-100">
                        {quantity}
                    </div>
                }
                <Button variant={'link'} Icon={ShoppingCartIcon}>
                    <span className="hidden lg:block">Cart</span>
                </Button>
            </NavLink>
        </nav>
        <Auth />
    </Fragment>
}