import { getPriceWithDiscount } from "../getPriceWithDiscount"

type FunctionArgs = {
    items: CheckoutInput['items']
    products: Array<Product>
    bargains: Array<Bargain>
}

type FunctionResponse = CheckoutMapData

export function checkoutItemMapper({ items, products, bargains }: FunctionArgs): Array<FunctionResponse> {
    const bargs = bargains?.map(barg => {
        return {
            documentId: barg?.documentId,
            id: barg?.id,
            name: barg?.products?.map(it => it?.name)?.join(' | '),
            quantity: 1,
            price: barg?.price,
            type: 'bargain' as FunctionResponse['type']
        }
    })
    
    const prods = products?.map(prod => {
        const quantity: number = items?.find(it => it?.id === prod?.documentId)?.quantity ?? 1
        return {
            documentId: prod?.documentId,
            id: prod?.id,
            name: prod?.name ?? '',
            quantity: quantity ?? 1,
            price: getPriceWithDiscount({ price: prod?.price, discount: prod?.discount }),
            type: 'product' as FunctionResponse['type']
        }
    })

    return bargs.concat(prods)
}