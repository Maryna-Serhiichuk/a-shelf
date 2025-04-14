/**
 * custom routers
 */

export default {
    routes: [
      {
        method: "DELETE",
        path: "/cart/:id",
        handler: "product.removeProduct",
        config: {},
      },
      {
        method: "POST",
        path: "/cart",
        handler: "product.addProduct",
        config: {},
      },
    ],
  }
  