export async function changeOrderStatus(this: { orderId: string }, status: OrderStatus) {
    return await strapi.documents('api::order.order').update({
        documentId: this.orderId,
        data: { delivery_status: status }
    })
}