import { FC } from "react";
import { CartProduct } from "@/components/CartProduct";
import { CartWrap } from "@/components/CartWrap";
import { CartPrice } from "@/components/CartPrice";
import { useCartlines } from "@/hooks/useCartlines";
import { useCartProviderContext } from "@/components/CartLayout/context/CartContextProvider";

export const BargainCart: FC<CartBargain> = ({ documentId, bargain }) => {
    const { removeCartBargain } = useCartlines()
    const { addToOrder } = useCartProviderContext()

    const removeItem = () => {
        try {
            removeCartBargain(documentId)
        } catch (e) {
            // + alert
        }

        // TODO: then().error()
    }

    const addBargainToOrder = () => {
        addToOrder({ bargain, quantity: 1 })
    }

    return <CartWrap onTrash={removeItem}>
        <div className="flex justify-between items-center w-full">
            <div>
                {bargain?.products?.map((product, index) => (
                    <CartProduct addItemToOrder={(bargain?.products?.length - 1) === index ? addBargainToOrder : undefined} key={product.documentId} {...product} />
                ))}
            </div>
            <div>
                <CartPrice
                    fullPrice={bargain?.products?.reduce((a, b) => a + b?.price, 0)}
                    price={bargain?.price}
                />
            </div>
        </div>
    </CartWrap>
}