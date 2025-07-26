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
      }
    ],
  }
  