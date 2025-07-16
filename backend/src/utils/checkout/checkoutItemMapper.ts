import { getPriceWithDiscount } from "../getPriceWithDiscount"

type FunctionArgs = {
    items: CheckoutInput['items']
    products: Array<Product>
}

type FunctionResponse = CheckoutMapData

export function checkoutItemMapper({ items, products }: FunctionArgs): Array<FunctionResponse> {
    return products?.map(prod => {
        const quantity: number = items?.find(it => it?.id === prod?.documentId)?.quantity ?? 1
        return {
            documentId: prod?.documentId,
            id: prod?.id,
            name: prod?.name ?? '',
            quantity: quantity ?? 1,
            price: getPriceWithDiscount({ price: prod?.price, discount: prod?.discount }),
            
        }
    })
}