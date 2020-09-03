/**
    .___ _____                    .__            
  __| _// ____\____ _____    ____ |  |__   ____  
 / __ |\   __\/ ___\\__  \ _/ ___\|  |  \_/ __ \ 
/ /_/ | |  | \  \___ / __ \\  \___|   Y  \  ___/ 
\____ | |__|  \___  >____  /\___  >___|  /\___  >
     \/           \/     \/     \/     \/     \/ 

     Dependency-free cache for Node.js
 **/
class dfcache {
    /**
     * contructor
     * 
     * updatetime - time in seconds between updates to cache
     * ttl - time for cache to live
     * 
     * @param {Object} obj 
     */
    constructor(obj) {
        this.cache = {};
        this.updateTime = obj.checkTime || 60;
        this.ttl = obj.ttl || 0;
    }

    /**
     * add
     *
     * Adds key to cache if it does not exist already
     *
     * @param {*} key cache key
     * @param {*} value value assigned to key
     * @param {int} ttl time to live for key (seconds)
     */
    async add(key, value, ttl = 0) {
        if (!this.cache[key]) {
            return (this.cache[key] = value);
        }
    }

    /**
     * get
     *
     * Get value of key if it exists
     *
     * @param {*} key cache key
     */
    async get(key) {
        return this.cache[key];
    }

    /**
     * clear
     *
     * Clear entire cache
     */
    async clear() {
        this.cache = {};
    }

    /**
     *
     * @param {*} key cache key
     * @param {*} value key value
     * @param {int} ttl time to live for key (seconds)
     */
    async update(key, value, ttl) {
        if (this.cache[key]) {
            this.cache[key] = value;
        }
    }

    /**
     * delete
     *
     * Delete key and value
     *
     * @param {*} key key value
     */
    async delete(key) {
        delete this.cache[key];
    }
}

module.exports = dfcache;
