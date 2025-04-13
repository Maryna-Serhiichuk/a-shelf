/**
 * custom routers
 */

export default {
    routes: [
      {
        method: "DELETE",
        path: "/remove-product/:id",
        handler: "product.removeProduct",
        config: {},
      },
    ],
  }
  