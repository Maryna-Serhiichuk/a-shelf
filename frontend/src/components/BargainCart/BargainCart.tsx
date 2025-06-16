import { FC } from "react";
import { CartProduct } from "@/components/CartProduct";
import { CartWrap } from "@/components/CartWrap";
import { CartPrice } from "@/components/CartPrice";
import { useCartlines } from "@/hooks/useCartlines";

export const BargainCart: FC<CartBargain> = ({ documentId, bargain }) => {
     const { removeCartBargain } = useCartlines()
    
    const removeItem = () => {
        try {
            removeCartBargain(documentId)
        } catch (e) {
            // + alert
        }

        // TODO: then().error()
    }

    return <CartWrap onTrash={removeItem}>
        <div className="flex justify-between items-center w-full">
            <div className="">
                {bargain?.products?.map(product => (
                    <CartProduct {...product} />
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