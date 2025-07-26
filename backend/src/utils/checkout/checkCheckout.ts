import { OrdersController } from '@paypal/paypal-server-sdk';
import { client } from '../paypalInstance';

type FunctionArgs = {
    checkoutId: string
}

type FunctionResponse = {
    status: string
}

export async function checkCheckout({ checkoutId }: FunctionArgs): Promise<FunctionResponse> {
    const collect = {
        id: checkoutId
    }

    const ordersController = new OrdersController(client);

    try {
        const result = await ordersController.getOrder(collect)
        return {
            status: result.result.status
        }

    } catch (e) {
        return { status: 'VOID' }
    }
}