import { CheckoutPaymentIntent, OrdersController } from '@paypal/paypal-server-sdk';
import { ItemCategory } from '@paypal/paypal-server-sdk';
import { client } from '../paypalInstance';

type FunctionArgs = {
    mapData: Array<CheckoutMapData>
    orderId: string
}

type FunctionResponse = {
    checkoutId: string
    status: string
    url: string
}

export async function createCheckout({ mapData, orderId }: FunctionArgs): Promise<FunctionResponse> {
    const productItems = mapData?.map(prod => ({
        name: prod?.name,
        quantity: prod?.quantity.toString(),
        unitAmount: {
            currencyCode: "USD",
            value: prod?.price.toString()
        },
        category: "PHYSICAL_GOODS" as ItemCategory
    }))

    const totalAnount = productItems?.reduce((accumulator, currentValue) => {
        const calculateWithQuantity = parseFloat(currentValue?.unitAmount?.value) * parseInt(currentValue?.quantity)
        return accumulator + calculateWithQuantity
    }, 0).toFixed(2)

    const publicUrl = process.env.NEXT_PUBLIC_HOST ?? 'http://127.0.0.1:1337'

    const collect = {
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
                {
                    items: productItems,
                    amount: {
                        currencyCode: "USD",
                        value: totalAnount,
                        breakdown: {
                            itemTotal: {
                                currencyCode: "USD",
                                value: totalAnount
                            }
                        }
                    }
                }
            ],
            application_context: {
                return_url: `${publicUrl}/success/${orderId}`,
                cancel_url: `${publicUrl}/cancel/${orderId}`,
            }
        },
        prefer: 'return=minimal'
    }

    const ordersController = new OrdersController(client);

    const { result, ...httpResponse } = await ordersController.createOrder(collect)

    return {
        checkoutId: result?.id,
        status: result?.status,
        url: result?.links?.find(it => it?.rel === 'approve')?.href
    }
}