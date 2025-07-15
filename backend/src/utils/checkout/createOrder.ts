type FunctionArgs = {
    mapData: Array<CheckoutMapData>
    orderId: string
    cheackoutId: string
    delivery_address: string
}

export async function createOrder({ mapData, orderId, cheackoutId, delivery_address }: FunctionArgs): Promise<Order> {
    const createdItems = await Promise.all(
        mapData.map(item =>
            strapi.db.query('molecule.order-item').create({
                data: {
                    product: { connect: [{ id: item.id }] },
                    quantity: item.quantity,
                    price: item.price
                },
            })
        )
    );

    return await strapi.db.query('api::order.order').create({
        data: {
            delivery_status: 'created',
            delivery_address,
            items: createdItems,
            uuid: orderId,
            checkout_id: cheackoutId
        },
        populate: { items: { populate: { product: true } } },
    })
}