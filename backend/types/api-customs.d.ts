declare global {

    interface CheckoutInputItem {
        id: string,
        quantity: number
    }

    interface CheckoutResponse {
        url: string
    }

    interface CheckoutInput {
        items: Array<CheckoutInputItem>
        address?: Omit<DeliveryInput, 'fullName'> & { firstName: string, lastName: string }
    }
}

export { };