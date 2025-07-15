type ProductsType = Array<any>;

export async function getProductsForCheckout(ids: string[]): Promise<ProductsType> {
    return await strapi.documents('api::product.product').findMany({
        where: {
            documentId: { $in: ids },
            // publishedAt: { $notNull: true }
        },
        populate: { discount: true },
        select: ['id', 'name', 'price', 'documentId', 'publishedAt']
    })
}