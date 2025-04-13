/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
    async removeProduct(ctx) {
        const { id } = ctx.params;

        const product = await strapi.db.query('api::product.product').findOne({
            where: { documentId: id }
        })

        if(!product) return {}

        const updatedUser = await strapi.db.query('plugin::users-permissions.user').update({
            where: { id: 1 }, // ctx.state.user.id
            data: {
              products: {
                disconnect: [product.id]
              }
            },
            populate: { products: true }
        })

        return updatedUser
      }
}));
