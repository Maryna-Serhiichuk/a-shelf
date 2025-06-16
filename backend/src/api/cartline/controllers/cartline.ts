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

        if (!(data?.products && data?.products?.length > 0 && data?.bargains && data?.bargains?.length > 0)) {
            ctx.status = 400;
            ctx.body = { error: 'Bad request. No data' };
            return;
        }

        let types: Array<{dataType: string, relative: string, type?: string}> = []

        if (data?.products && data?.products?.length > 0) {
            types.concat({ dataType: 'products', relative: 'cartline', type: 'product' })
        }

        if (data?.bargains && data?.bargains?.length > 0) {
            types.concat({ dataType: 'bargains', relative: 'cart-bargain', type: 'bargain' })
        }

        if (types?.length <= 0) return { data: [] }

        const response = types?.map(async type => {
            if (data?.[type.dataType] && data?.[type.dataType]?.length > 0) {
                const lines = await strapi.db.query(`api::${type.relative}.${type.relative}`).findMany({
                    where: { user: { id: ctx?.state?.user?.id } },
                    populate: { [type.type]: true }
                })

                const existCartlineIds = lines?.map(line => line?.[type.type]?.documentId)

                const filteredData = data?.[type.dataType]?.filter(line => !existCartlineIds?.includes(line?.id))

                const cartline = await Promise.all(
                    filteredData.map(async (item) => {
                        const prod = await strapi.db.query(`api::${type.type}.${type.type}`).findOne({
                            where: { documentId: item?.id }
                        });

                        return strapi.db.query(`api::${type.relative}.${type.relative}`).create({
                            data: {
                                quantity: item?.quantity,
                                user: {
                                    connect: [ctx?.state?.user?.id],
                                },
                                [type.type]: {
                                    connect: [prod.id],
                                },
                                uuid: v4(),
                            },
                        });
                    })
                )

                return { [type.dataType]: cartline }
            }
        })

        return { data: response }
    },
}))