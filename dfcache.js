/***************************************************
    .___ _____                    .__            
  __| _// ____\____ _____    ____ |  |__   ____  
 / __ |\   __\/ ___\\__  \ _/ ___\|  |  \_/ __ \ 
/ /_/ | |  | \  \___ / __ \\  \___|   Y  \  ___/ 
\____ | |__|  \___  >____  /\___  >___|  /\___  >
     \/           \/     \/     \/     \/     \/ 

     Dependency-free cache for Node.js
 ***************************************************/

const Emitter = require("events").EventEmitter;

class dfcache extends Emitter {
    /**
     *
     * ttl - time for cache to live. Default: 0 (unlimited)
     *
     * @param {Object} obj
     */
    constructor(obj = {}) {
        super();
        this.cache = {};
        this.ttl = obj.ttl || 0;
        this.cacheEvent = new Emitter();

        this.setCachePurge(this.ttl);
    }

    /**
     *
     * Adds key to cache if it does not exist already
     *
     * @param {*} key cache key
     * @param {*} value value assigned to key
     * @param {int} ttl time to live for key (seconds)
     */
    add(key, value, ttl = 0) {
        if (!this.cache[key]) {
            if (ttl > 0) {
                this.setKeyExpiration(key, ttl);
            }
            return (this.cache[key] = { value, ttl });
        }
    }

    /**
     *
     * Get value of key if it exists
     *
     * @param {*} key cache key
     */
    get(key) {
        if (this.cache[key]) {
            return this.cache[key]["value"];
        }
    }

    /**
     *
     * Clear entire cache
     */
    clear() {
        this.cache = {};
        this.cacheEvent.emit("purged");
    }

    /**
     *
     * Update key with new value if key exists
     *
     * @param {*} key cache key
     * @param {*} value key value
     * @param {int} ttl time to live for key (seconds)
     */
    update(key, value, ttl) {
        if (this.cache[key]) {
            if (this.cache[key]["ttl"] && !ttl) {
                ttl = this.cache[key]["ttl"];
                this.cache[key] = { value, ttl };
                return;
            }
            if (ttl > 0) {
                this.setKeyExpiration(key, ttl);
            }
            this.cache[key] = { value, ttl };
        }
    }

    /**
     *
     * Delete key and value
     *
     * @param {*} key key value
     */
    delete(key) {
        delete this.cache[key];
    }

    /**
     *
     * List all keys in cache as an array
     *
     */
    listKeys() {
        return Object.keys(this.cache);
    }

    /**
     * 
     * Check if key exists in cache
     * 
     * @param {*} key 
     */
    keyExists(key) {
        return key in this.cache;
    }

    /**
     *
     * Expire key and value
     *
     * @param {*} key key value
     */
    expireKey(key) {
        this.delete(key);
        this.cacheEvent.emit("expired", key);
    }

    /**
     *
     * Clear cache after given ttl
     *
     * @param {int} ttl time to live
     */
    setCachePurge(ttl) {
        setTimeout(() => {
            this.clear();
        }, ttl * 1000);
    }

    /**
     *
     * Delete key after given ttl
     *
     * @param {*} key value of key
     * @param {int} ttl time to live
     */
    setKeyExpiration(key, ttl) {
        setTimeout(() => {
            this.expireKey(key);
        }, ttl * 1000);
    }
}

module.exports = dfcache;
