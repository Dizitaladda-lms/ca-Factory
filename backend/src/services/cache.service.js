/** Simple per-process TTL cache. */
class CacheService {
  constructor() {
    this.memoryStore = new Map();
    console.log("Cache Engine: Using In-Memory Cache");
  }

  async get(key) {
    const item = this.memoryStore.get(key);
    if (!item) return null;
    if (Date.now() >= item.expiresAt) {
      this.memoryStore.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key, value, ttlSeconds = 300) {
    this.memoryStore.set(key, {
      value,
      expiresAt: Date.now() + Math.max(0, Number(ttlSeconds) || 0) * 1000,
    });
    return true;
  }

  async del(key) {
    this.memoryStore.delete(key);
  }

  async delPattern(pattern) {
    const prefix = String(pattern).replace(/\*+$/, "");
    for (const key of this.memoryStore.keys()) {
      if (key.startsWith(prefix)) this.memoryStore.delete(key);
    }
  }

  async flush() {
    this.memoryStore.clear();
  }
}

module.exports = new CacheService();
