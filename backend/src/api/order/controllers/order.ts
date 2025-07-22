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
import { getBargainsForCheckout } from '../../../utils/checkout/getBargainsForCheckout';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async checkout(ctx) {
        const { items, deliveryAddress }: CheckoutInput = ctx.request.body

        if (!items || !items?.length) return null

        try {

            const onlyProducts = items?.filter(it => it?.type === 'product')?.map(it => it?.id)
            const products = await getProductsForCheckout(onlyProducts)

            const onlyBargaint = items?.filter(it => it?.type === 'bargain')?.map(it => it?.id)
            const bargains = await getBargainsForCheckout(onlyBargaint)

            const transformedItems = checkoutItemMapper({ items, products, bargains })

            const orderId = v4()

            const result = await createCheckout({ mapData: transformedItems, orderId, deliveryAddress })

            if (result?.checkoutId) {
                await createOrder({ mapData: transformedItems, orderId, cheackoutId: result.checkoutId, deliveryAddress, userId: ctx?.state?.user?.id })
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
    async findOne(ctx) {
        const { id } = ctx.params

        let order = await strapi.documents('api::order.order').findFirst({
            filters: {
                uuid: id
            },
            populate: { user: true }
        })

        if (!order) return ctx.notFound('Order not found')

        if (ctx?.state?.user?.id && order?.user?.id) {
            if (order?.user?.id !== ctx?.state?.user?.id) return ctx.notFound('Order not found')
        }

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
                        },
                        bargain: {
                            populate: {
                                products: {
                                    populate: {
                                        illustration: true
                                    }
                                }
                            }
                        }
                    }
                },
                delivery_address: true
            },
        })

        return { data: order }
    },
    async find(ctx) {

        const userId = ctx?.state?.user?.id

        if (!userId) {
            return ctx.unauthorized('You must be logged in.');
        }

        ctx.query = {
            ...ctx.query,
            filters: {
                ...(typeof ctx.query.filters === 'object' && ctx.query.filters !== null ? ctx.query.filters : {}),
                user: { id: userId },
            },
            populate: {
                items: {
                    populate: {
                        product: true,

                        bargain: {
                            populate: {
                                products: true
                            }
                        }
                    }
                },
            }
        };

        const orders = await strapi.documents('api::order.order').findMany(ctx.query)

        return { data: orders, meta: {} }
    },
}));
