const pool = require("../config/db");
const cache = require("./cache.service");

// Scheduled publishing uses PostgreSQL as the durable queue; this works without a separate worker.
const publishDuePosts = async () => {
  const db = pool.getRealPool?.();
  if (!db) return;
  try {
    const result = await db.query(`UPDATE blogs SET status='published', is_published=true,
      published_at=COALESCE(published_at,CURRENT_TIMESTAMP), updated_at=CURRENT_TIMESTAMP
      WHERE status='scheduled' AND scheduled_at <= CURRENT_TIMESTAMP RETURNING id`);
    if (result.rowCount) {
      if (cache.redis && cache.isRedisReady) {
        const keys = await cache.redis.keys("blogs:*");
        if (keys.length) await cache.redis.del(...keys);
      } else cache.memoryStore.clear();
    }
  } catch (error) { console.warn("Blog scheduler notice:", error.message); }
};

const timer = setInterval(publishDuePosts, 60 * 1000);
timer.unref();
publishDuePosts();
module.exports = publishDuePosts;
