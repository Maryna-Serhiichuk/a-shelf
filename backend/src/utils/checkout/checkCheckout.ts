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

    const { result, ...httpResponse } = await ordersController.getOrder(collect)

    return {
        status: result.status
    }
}