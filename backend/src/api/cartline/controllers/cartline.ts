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

        if(!product) return {}

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
}));
