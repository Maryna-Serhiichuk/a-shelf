declare global {

    type OrderItemType = 'product' | 'bargain'

    interface CheckoutInputItem {
        id: string,
        quantity: number
        type: OrderItemType
    }

    interface CheckoutResponse {
        url: string
    }

    interface CheckoutInput {
        items: Array<CheckoutInputItem>
        deliveryAddress?: Omit<DeliveryInput, 'fullName'> & { firstName: string, lastName: string }
    }
}

export { };