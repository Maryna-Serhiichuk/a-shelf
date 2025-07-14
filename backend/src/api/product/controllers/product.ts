/**
 * product controller
 */

import { factories } from '@strapi/strapi'

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
    }
}));
