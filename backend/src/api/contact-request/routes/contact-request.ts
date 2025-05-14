/**
 * contact-request router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::contact-request.contact-request', {
    config: {
        create: {
            middlewares: ["api::contact-request.ip-rate-limiter"],
        },
    },
});
