export type OrderStatusMessagesType<T = string> = { [key in OrderStatus]: { label: T, color: string } }

export const orderStatusMessages: OrderStatusMessagesType = {
    created: { label: "Not Paid", color: "bg-blue-100" },
    processing: { label: "Processing", color: "bg-green-100" },
    delivering: { label: "Delivering", color: "bg-green-100" },
    delivered: { label: "Delivered", color: "bg-green-100" },
    void: { label: "The order is unpaid", color: "bg-gray-200" }
} 