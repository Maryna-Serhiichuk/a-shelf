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
    ],
  }
  