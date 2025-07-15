/**
 * custom routers
 */

export default {
    routes: [
      {
        method: "POST",
        path: "/checkout",
        handler: "order.checkout",
        config: {},
      },
      {
        method: "POST",
        path: "/payment-check",
        handler: "order.paymentCheck",
        config: {},
      },
    ],
  }
  