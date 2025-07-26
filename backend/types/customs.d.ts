declare global {

    interface CheckoutMapData {
        documentId: string
        id: ID
        name: string
        quantity: number
        price: number
        type: OrderItemType
    }

}

export { };