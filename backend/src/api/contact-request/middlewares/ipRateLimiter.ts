const rateLimitMap = new Map();

export default (config, { strapi }) => {
    return async (ctx, next) => {
        const ip = ctx.request.ip;
        const now = Date.now();
        const windowMs = 60 * 1000;
        const maxRequests = 3;

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, []);
        }

        const timestamps = rateLimitMap.get(ip).filter(ts => now - ts < windowMs);
        timestamps.push(now);
        rateLimitMap.set(ip, timestamps);

        if (timestamps.length > maxRequests) {
            ctx.status = 429;
            ctx.body = { error: 'Too many requests from this IP' };
            return;
        }

        await next();
    };
};