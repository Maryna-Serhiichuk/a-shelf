type BargainsType = Array<any>;

export async function getBargainsForCheckout(ids: string[]): Promise<BargainsType> {
    return await strapi.documents('api::bargain.bargain').findMany({
        filters: {
            documentId: { $in: ids },
            // publishedAt: { $notNull: true }
        },
        populate: { products: true },
        fields: ['id', 'label', 'price', 'publishedAt']
    })
}