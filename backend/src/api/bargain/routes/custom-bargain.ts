/**
 * custom routers
 */

export default {
    routes: [
      {
        method: "GET",
        path: "/relevantBargains",
        handler: "bargain.relevantBargains",
        config: {},
      },
      {
        method: "POST",
        path: "/bargains-by-ids",
        handler: "bargain.bargainsByIds",
        config: {},
      },
    ],
  }
  