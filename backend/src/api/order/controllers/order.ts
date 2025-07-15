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
import { checkCheckout } from '../../../utils/checkout/checkCheckout';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async checkout(ctx) {
        const { items, deliveryAddress } = ctx.request.body

        if (!items || !items?.length) return null

        const ids = items?.map(it => it?.id)

        try {
            const products = await getProductsForCheckout(ids)

            const transformedItems = checkoutItemMapper({ items, products })

            const orderId = v4()

            const result = await createCheckout({ mapData: transformedItems, orderId })

            if (result?.status === 'CREATED') {
                await createOrder({ mapData: transformedItems, orderId, cheackoutId: result.checkoutId, deliveryAddress })
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
        const { id } = ctx.request.body

        const order = await strapi.documents('api::order.order').findFirst({
            filters: {
                uuid: id
            }
        })

        if (!order) return { status: 'FAILED', message: 'Order missing' }
        if (!order.checkout_id) return { status: 'FAILED', message: 'Checkoud id missing' }
        if (order.delivery_status !== 'created') return { status: 'MANUAL', message: 'Status change from admin panel' }

        const result = await checkCheckout({ checkoutId: order.checkout_id })

        if (result.status === 'APPROVED') {
            await strapi.documents('api::order.order').update({
                documentId: id,
                data: { delivery_status: "processing" }
            })
            return { status: 'APPROVED', message: 'Status changed' }
        }

        if (result.status === 'VOID') {
            await strapi.documents('api::order.order').update({
                documentId: id,
                data: { delivery_status: "void" }
            })
            return { status: 'VOID', message: 'Checkout is void' }
        }

        return { status: result.status, message: 'Status didn\'t change' }
    },
    async find(args) {
        const { data, meta } = await super.find(args);

        const order = data[0]
        if (!order) return null

        const ord = await strapi.documents('api::order.order').findOne({
            documentId: order.documentId,
            populate: { 
                items: { populate: { product: { populate: { illustration: true } } } },
                delivery_address: true 
            }, 
        })

        return { data: [ord] }
    },
}));
