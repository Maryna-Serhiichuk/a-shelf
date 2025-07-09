/**
 * product controller
 */

import { factories } from '@strapi/strapi'
import paypal, { ItemCategory } from '@paypal/paypal-server-sdk';
import { ApiError, CheckoutPaymentIntent, OrdersController } from '@paypal/paypal-server-sdk';
import { client } from '../../../utils/paypalInstance';
import { getPriceWithDiscount } from '../../../utils/getPriceWithDiscount';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
    async productsByIds(ctx) {
        const { ids, populate } = ctx.request.body

        const products = await strapi.db.query('api::product.product').findMany({
            where: {
                documentId: { $in: ids },
                publishedAt: { $notNull: true }
            },
            populate
        })


        return { data: products }
    },
    async checkout(ctx) {
        const { items } = ctx.request.body

        if (!items || !items?.length) return null

        // якщо нема user, то обов'язково має заповнити адресу відправки
        // // відправити на пошту посилання і пароль за яким побачити статус відправки

        // якщо є user зберігати в базу

        const ids = items?.map(it => it?.id)

        const products = await strapi.db.query('api::product.product').findMany({
            where: {
                documentId: { $in: ids },
                publishedAt: { $notNull: true }
            },
            populate: { discount: true },
            select: ['id', 'name', 'price', 'documentId']
        })

        const productItems = products?.map(prod => {
            const quantity: number = items?.find(it => it?.id === prod?.documentId)?.quantity ?? 1
            return {
                name: prod?.name ?? '',
                quantity: (quantity ?? 1).toString(),
                unitAmount: {
                    currencyCode: "USD",
                    value: getPriceWithDiscount({ price: prod?.price, discount: prod?.discount }).toString()
                },
                category: "PHYSICAL_GOODS" as ItemCategory
            }
        })

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
                    return_url: `${publicUrl}/success`,
                    cancel_url: `${publicUrl}/cancel`,
                }
            },
            prefer: 'return=minimal'
        }

        try {
            const ordersController = new OrdersController(client);

            const { result, ...httpResponse } = await ordersController.createOrder(collect)
            console.log(result)
            return { url: result?.links?.find(it => it?.rel === 'approve')?.href }

            // зберегти у базу, як успішну оплату

            // відправити на пошту посилання на дані із відправкою
            // відправляти зміни статусів
            // відправити посилання на чек
        } catch (error) {
            if (error instanceof ApiError) {
                const errors = error.result;
                // const { statusCode, headers } = error;
            }
        }

        return { url: '' }
    }
}));
