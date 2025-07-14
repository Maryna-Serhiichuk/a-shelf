/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import { ItemCategory } from '@paypal/paypal-server-sdk';
import { ApiError, CheckoutPaymentIntent, OrdersController } from '@paypal/paypal-server-sdk';
import { client } from '../../../utils/paypalInstance';
import { getPriceWithDiscount } from '../../../utils/getPriceWithDiscount';
import { v4 } from 'uuid';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async checkout(ctx) {
        const { items } = ctx.request.body

        if (!items || !items?.length) return null

        // якщо нема user, то обов'язково має заповнити адресу відправки
        // // відправити на пошту посилання і пароль за яким побачити статус відправки

        // якщо є user зберігати в базу

        const ids = items?.map(it => it?.id)

        const products = await strapi.documents('api::product.product').findMany({
            where: {
                documentId: { $in: ids },
                // publishedAt: { $notNull: true }
            },
            populate: { discount: true },
            select: ['id', 'name', 'price', 'documentId', 'publishedAt']
        })

        const transformedItems = products?.map(prod => {
            const quantity: number = items?.find(it => it?.id === prod?.documentId)?.quantity ?? 1
            return {
                documentId: prod?.documentId,
                id: prod?.id,
                name: prod?.name ?? '',
                quantity: quantity ?? 1,
                price: getPriceWithDiscount({ price: prod?.price, discount: prod?.discount }),
            }
        })

        const orderId = v4()

        try {
            const createdItems = await Promise.all(
                transformedItems.map(item =>
                    strapi.db.query('molecule.order-item').create({
                        data: {
                            product: { connect: [{ id: item.id }] },
                            quantity: item.quantity,
                            price: item.price,
                        },
                        // populate: { product: true },
                    })
                )
            );

            const createdOrder = await strapi.db.query('api::order.order').create({
                data: {
                    delivery_status: 'created',
                    // delivery_address
                    items: createdItems,
                    uuid: orderId
                },
                populate: { items: { populate: { product: true } } },
            })

        } catch (e) {
            console.log(e)
            return { url: undefined }
        }

        const productItems = transformedItems?.map(prod => ({
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

        try {
            const ordersController = new OrdersController(client);

            const { result, ...httpResponse } = await ordersController.createOrder(collect)
            console.log(result)
            return { url: result?.links?.find(it => it?.rel === 'approve')?.href }

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
