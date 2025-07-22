import { CheckoutPaymentIntent, OrdersController } from '@paypal/paypal-server-sdk';
import { ItemCategory } from '@paypal/paypal-server-sdk';
import { client } from '../paypalInstance';

type FunctionArgs = {
    mapData: Array<CheckoutMapData>
    orderId: string
    deliveryAddress: CheckoutInput['deliveryAddress']
}

type FunctionResponse = {
    checkoutId: string
    status: string
    url: string
}

export async function createCheckout({ mapData, orderId, deliveryAddress }: FunctionArgs): Promise<FunctionResponse> {
    const productItems = mapData?.map(prod => ({
        name: prod?.name,
        quantity: prod?.quantity.toString(),
        unitAmount: {
            currencyCode: "USD",
            value: prod?.price.toString()
        },
        category: "PHYSICAL_GOODS" as ItemCategory,
    }))

    const totalAmount = productItems?.reduce((accumulator, currentValue) => {
        const calculateWithQuantity = parseFloat(currentValue?.unitAmount?.value) * parseInt(currentValue?.quantity)
        return accumulator + calculateWithQuantity
    }, 0).toFixed(2)

    const publicUrl = process.env.NEXT_PUBLIC_HOST ?? 'http://127.0.0.1:3000'

    const collect = {
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
                {
                    items: productItems,
                    amount: {
                        currencyCode: "USD",
                        value: totalAmount,
                        breakdown: {
                            itemTotal: {
                                currencyCode: "USD",
                                value: totalAmount
                            }
                        }
                    }
                }
            ],
            paymentSource: {
                paypal: {
                    experienceContext: {
                        brandName: "A-Shelf",
                        returnUrl: `${publicUrl}/order/${orderId}?status=success`,
                        cancelUrl: `${publicUrl}/order/${orderId}?status=cancel`,
                        // paymentmethodPreference: PayeePaymentMethodPreference.ImmediatePaymentRequired,
                    },
                    address: {
                        addressLine1: deliveryAddress.address,
                        adminArea2: deliveryAddress.city,
                        adminArea1: deliveryAddress.region,
                        postalCode: deliveryAddress.postCode,
                        countryCode: "US"
                    }
                }
            }
        },
        prefer: 'return=minimal'
    }

    const ordersController = new OrdersController(client);

    const { result, ...httpResponse } = await ordersController.createOrder(collect)

    return {
        checkoutId: result?.id,
        status: result?.status,
        url: result?.links?.find(it => it?.rel === 'payer-action')?.href
    }
}