/**
 * custom routers
 */

export default {
    routes: [
      {
        method: "POST",
        path: "/products-by-ids",
        handler: "product.productsByIds",
        config: {},
      }
    ],
  }
  