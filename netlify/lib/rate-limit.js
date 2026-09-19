/**
 * Best-effort in-memory rate limiter.
 *
 * Netlify functions are stateless and may run many concurrent instances, so
 * this is not a hard guarantee — traffic spread across instances can exceed
 * the limit. It does stop the common case of one client hammering a warm
 * instance. A durable store would be needed for a real quota.
 */
const hits = new Map();

export const rateLimit = (key, { max = 3, windowMs = 10 * 60 * 1000 } = {}) => {
    const now = Date.now();
    const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

    if (timestamps.length >= max) {
        const retryAfter = Math.ceil((windowMs - (now - timestamps[0])) / 1000);
        return { allowed: false, retryAfter };
    }

    timestamps.push(now);
    hits.set(key, timestamps);

    // Keep the map from growing without bound on a long-lived instance.
    if (hits.size > 5000) {
        for (const [k, v] of hits) {
            if (v.every((t) => now - t >= windowMs)) hits.delete(k);
        }
    }

    return { allowed: true };
};
