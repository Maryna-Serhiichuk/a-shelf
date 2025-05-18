/**
 * cartline controller
 */

import { factories } from '@strapi/strapi'
import { v4 } from 'uuid';

export default factories.createCoreController('api::cartline.cartline', ({ strapi }) => ({
    async create(ctx) {
        const { id } = ctx.request.body
        const product = await strapi.db.query('api::product.product').findOne({
            where: { documentId: id }
        })

        if (!product) return {}

        const cartline = await strapi.db.query('api::cartline.cartline').create({
            data: {
                user: {
                    connect: [ctx?.state?.user?.id]
                },
                product: {
                    connect: [product.id]
                },
                uuid: v4()
            },
        })

        return cartline
    },
    async createCartlines(ctx) {
        const { data } = ctx.request.body

        if (!(data && data?.length > 0)) {
            ctx.status = 400;
            ctx.body = { error: 'Bad request. No data' };
            return;
        }

        const cartlines = await strapi.db.query('api::cartline.cartline').findMany({
            where: { user: { id: ctx?.state?.user?.id } },
            populate: { product: true }
        })
        
        const existCartlineIds = cartlines?.map(line => line?.product?.documentId)

        const filteredData = data?.filter(line => !existCartlineIds?.includes(line?.id))

        const cartline = await Promise.all(
            filteredData.map(async (product) => {
                const prod = await strapi.db.query('api::product.product').findOne({
                    where: { documentId: product?.id }
                });

                return strapi.db.query('api::cartline.cartline').create({
                    data: {
                        quantity: product?.quantity,
                        user: {
                            connect: [ctx?.state?.user?.id],
                        },
                        product: {
                            connect: [prod.id],
                        },
                        uuid: v4(),
                    },
                });
            })
        )

        return { data: cartline }
    },
}))