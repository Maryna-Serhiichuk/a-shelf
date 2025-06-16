/**
 * cart-bargain controller
 */

import { factories } from '@strapi/strapi'
import { v4 } from 'uuid';

export default factories.createCoreController('api::cart-bargain.cart-bargain', ({ strapi }) => ({
    async create(ctx) {
        const { id } = ctx.request.body
        const bargain = await strapi.db.query('api::bargain.bargain').findOne({
            where: { documentId: id }
        })

        if (!bargain) return {}

        const cartline = await strapi.db.query('api::cart-bargain.cart-bargain').create({
            data: {
                user: {
                    connect: [ctx?.state?.user?.id]
                },
                bargain: {
                    connect: [bargain.id]
                },
                uuid: v4()
            },
        })

        return cartline
    },
}))