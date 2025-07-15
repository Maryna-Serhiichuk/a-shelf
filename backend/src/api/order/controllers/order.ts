/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import { ApiError } from '@paypal/paypal-server-sdk';
import { getProductsForCheckout } from '../../../utils/checkout/getProductsForCheckout';
import { checkoutItemMapper } from '../../../utils/checkout/checkoutItemMapper';
import { createOrder } from '../../../utils/checkout/createOrder';
import { createCheckout } from '../../../utils/checkout/createCheckout';
import { v4 } from 'uuid';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async checkout(ctx) {
        const { items, deliveryAddress } = ctx.request.body

        const { firstName, lastName, ...chargeFields } = deliveryAddress
        const address = {
            fullName: deliveryAddress.firstName + " " + deliveryAddress.lastName,
            ...chargeFields
        }
        const delivery_address = Object.values(address).join('\n')

        if (!items || !items?.length) return null

        const ids = items?.map(it => it?.id)

        try {
            const products = await getProductsForCheckout(ids)

            const transformedItems = checkoutItemMapper({ items, products })

            const orderId = v4()

            const result = await createCheckout({ mapData: transformedItems, orderId })

            if (result?.status === 'CREATED') {
                await createOrder({ mapData: transformedItems, orderId, cheackoutId: result.checkoutId, delivery_address })
            }

            return { url: result?.url }
        } catch (error) {
            if (error instanceof ApiError) {
                const errors = error.result;
                console.log(errors)
                // const { statusCode, headers } = error;
            }
        }

        return { url: '' }
    },
    async paymentCheck(ctx) {
        // url = https://www.sandbox.paypal.com/checkoutnow?token=8NY2429013616852G

    },
}));
