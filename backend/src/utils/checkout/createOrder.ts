type FunctionArgs = {
    mapData: Array<CheckoutMapData>
    orderId: string
    cheackoutId: string
    deliveryAddress: CheckoutInput['address']
    userId?: boolean
}

export async function createOrder({ mapData, orderId, cheackoutId, deliveryAddress, userId }: FunctionArgs): Promise<Order> {
    const { firstName, lastName, ...address } = deliveryAddress
    
    const delivery_address = await strapi.db.query('molecule.address').create({
        data: {
            fullName: firstName + ' ' + lastName,
            ...address
        },
    })

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
            checkout_id: cheackoutId,
            ...(userId ? {user: { connect: [userId] }} : {})
        },
        populate: { items: { populate: { product: true } } },
    })
}