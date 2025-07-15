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
        address?: DeliveryInput
    }

    interface DeliveryInput {
        firstName: string
        lastName: string
        email: string
        phone: string
        address: string
        city: string
        region: string
        postCode: string
    }
}

export { };