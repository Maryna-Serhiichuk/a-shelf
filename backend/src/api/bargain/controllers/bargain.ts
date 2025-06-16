/**
 * bargain controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::bargain.bargain', ({ strapi }) => ({
    async relevantBargains(ctx) {
        const { id, type }  = ctx.query

        const bargains = await super.find(ctx)
        if(!id && !type) return bargains

        const data = bargains.data

        let productType = type
        let response = []

        if (id) {
            const result = data?.filter(bargain => bargain?.products?.map(product => product?.documentId)?.includes(id))
            response = response.concat(result)
        }

        if(id && !productType) {
            const product = await strapi.db.query('api::product.product').findOne({
                where: { documentId: id },
                populate: { type: true }
            })

            productType = product?.type?.slug
        }

        if(productType) {
            const result = data?.filter(bargain => (!bargain?.products?.map(product => product?.documentId)?.includes(id) && bargain?.products?.map(product => product?.type?.slug)?.includes(productType)))
            response = response.concat(result)
        }

        return { ...bargains, data: response }
    },
    async bargainsByIds(ctx) {
        const { ids, populate } = ctx.request.body

        const bargains = await strapi.db.query('api::bargain.bargain').findMany({
            where: {
                documentId: { $in: ids },
                publishedAt: { $notNull: true }
            },
            populate
        })


        return { data: bargains }
    }
}));
