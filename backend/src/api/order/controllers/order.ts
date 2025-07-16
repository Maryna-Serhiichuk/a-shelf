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
import { paymentCheck } from '../../../utils/checkout/paymentCheck';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async checkout(ctx) {
        const { items, deliveryAddress } = ctx.request.body

        if (!items || !items?.length) return null

        const ids = items?.map(it => it?.id)

        try {
            const products = await getProductsForCheckout(ids)

            const transformedItems = checkoutItemMapper({ items, products })

            const orderId = v4()

            const result = await createCheckout({ mapData: transformedItems, orderId, deliveryAddress })

            if (result?.checkoutId) {
                await createOrder({ mapData: transformedItems, orderId, cheackoutId: result.checkoutId, deliveryAddress })
            }

            return { url: result?.url }
        } catch (error) {
            if (error instanceof ApiError) {
                const errors = error.result;
                console.log('---', errors)
                // const { statusCode, headers } = error;
            }
        }

        return { url: '' }
    },
    async find(args) {
        const { data, meta } = await super.find(args);

        let order = data[0]
        if (!order) return null


        if (order.checkout_id && order.delivery_status === 'created') {
            await paymentCheck(order.documentId, order.checkout_id)
        }

        order = await strapi.documents('api::order.order').findOne({
            documentId: order.documentId,
            populate: {
                items: {
                    populate: {
                        product: {
                            populate: {
                                illustration: true,
                                discount: true
                            }
                        }
                    }
                },
                delivery_address: true
            },
        })

        return { data: [order] }
    },
}));
