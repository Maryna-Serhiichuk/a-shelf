import { FC, useCallback, useEffect, useState, memo } from "react";
import debounce from 'lodash.debounce';
import { useCartlines } from "@/hooks/useCartlines";
import { CartProduct } from "@/components/CartProduct";
import { CartPrice } from "@/components/CartPrice";
import { CartWrap } from "@/components/CartWrap";
import { getPriceWithDiscount } from "@/utils/getPriceWithDiscount";
import { useCartProviderContext } from "@/components/CartLayout/context/CartContextProvider";

export const Desire: FC<Cartline> = memo(({ documentId, product, quantity }) => {
    const { addToOrder } = useCartProviderContext()

    const { changeCartline, removeCartline } = useCartlines()

    const [productQuantity, setQuantity] = useState(quantity)
    const [price, setPrice] = useState<number>(product?.price * quantity)

    const updatePrice = (count: number) => {
        const withDiscount = getPriceWithDiscount({ price: product?.price, discount: product?.discount })
        setPrice(withDiscount * count)
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

    const addItemToOrder = () => {
        addToOrder({ product, quantity })
    }

    return <CartWrap onTrash={removeItem}>
        <CartProduct {...product} addItemToOrder={addItemToOrder} />
        <CartPrice
            value={productQuantity}
            onChange={quantityControler}
            price={price}
        />
    </CartWrap>
})