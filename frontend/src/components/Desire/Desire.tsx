import { FC, useCallback, useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import { useCartlines } from "@/hooks/useCartlines";
import { CartProduct } from "@/components/CartProduct";
import { CartPrice } from "@/components/CartPrice";
import { CartWrap } from "@/components/CartWrap";
import { getPriceWithDiscount } from "@/utils/getPriceWithDiscount";

export const Desire: FC<Cartline> = ({ documentId, product, quantity }) => {
    const { changeCartline, removeCartline } = useCartlines()

    const [productQuantity, setQuantity] = useState(quantity)
    const [price, setPrice] = useState<number>(product?.price * quantity)

    const updatePrice = (count: number) => {
        setPrice(product?.price * count)
    }

    const valuesControler = (quant: number) => {
        updatePrice(quant)
        setQuantity(quant)
    }

    const resetValues = () => {
        valuesControler(quantity)
    }

    useEffect(() => {
        quantityControler(productQuantity)
    }, [productQuantity])

    const quantityControler = useCallback((value: number) => {
        if (quantity !== value) {
            changeQuantity(value)
        }
        valuesControler(value)
    }, [quantity])

    const changeQuantity = useCallback(
        debounce((value: number) => {
            try {
                changeCartline({ id: documentId, quantity: value })
                // throw Error()
            } catch (e) {
                resetValues()
                // + alert
            }

            // TODO: then().error()
        }, 1000),
        []
    )

    const removeItem = () => {
        try {
            removeCartline(documentId)
        } catch (e) {
            // + alert
        }

        // TODO: then().error()
    }

    return <CartWrap onTrash={removeItem}>
        <CartProduct {...product} />
        <CartPrice 
            value={productQuantity}
            onChange={quantityControler}
            price={getPriceWithDiscount({ price, discount: product?.discount })}
        />
    </CartWrap>
}