/**
 * custom routers
 */

export default {
    routes: [
      {
        method: "POST",
        path: "/create-cartlines",
        handler: "cartline.createCartlines",
        config: {},
      },
    ],
  }
  