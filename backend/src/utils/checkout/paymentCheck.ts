import { changeOrderStatus } from "./changeOrderStatus"
import { checkCheckout } from "./checkCheckout"

export async function paymentCheck(id: string, checkoutId: string) {
    const result = await checkCheckout({ checkoutId })

    const changeStatus = changeOrderStatus.bind({ orderId: id })

    if (result.status === 'APPROVED') {
        return changeStatus('processing')
    }

    if (result.status === 'VOID') {
        return changeStatus('void')
    }
}