/***************************************************
    .___ _____                    .__            
  __| _// ____\____ _____    ____ |  |__   ____  
 / __ |\   __\/ ___\\__  \ _/ ___\|  |  \_/ __ \ 
/ /_/ | |  | \  \___ / __ \\  \___|   Y  \  ___/ 
\____ | |__|  \___  >____  /\___  >___|  /\___  >
     \/           \/     \/     \/     \/     \/ 

     Dependency-free cache for Node.js
 ***************************************************/

class dfcache {
    /**
     * 
     * updatetime - time in seconds between updates to cache Default: 60
     * ttl - time for cache to live. Default: 0 (unlimited)
     * 
     * @param {Object} obj 
     */
    constructor(obj={}) {
        this.cache = {};
        this.updateTime = obj.checkTime || 60;
        this.ttl = obj.ttl || 0;

        // TODO: Add events for timeouts 
    }

    /**
     *
     * Adds key to cache if it does not exist already
     *
     * @param {*} key cache key
     * @param {*} value value assigned to key
     * @param {int} ttl time to live for key (seconds)
     */
    async add(key, value, ttl = 0) {
        if (!this.cache[key]) {
            return (this.cache[key] = {value, ttl});
        }
    }

    /**
     *
     * Get value of key if it exists
     *
     * @param {*} key cache key
     */
    async get(key) {
        if(this.cache[key]) {
            return this.cache[key]['value'];
        }
    }

    /**
     *
     * Clear entire cache
     */
    async clear() {
        this.cache = {};
    }

    /**
     *
     * Update key with new value if key exists
     *
     * @param {*} key cache key
     * @param {*} value key value
     * @param {int} ttl time to live for key (seconds)
     */
    async update(key, value, ttl) {
        if (this.cache[key]) {
            if(this.cache[key]['ttl'] && !ttl) {
                ttl = this.cache[key]['ttl'];
                // TODO: add event for ttl
                return this.cache[key] = {value,  ttl}
            } 
            return this.cache[key] = {value, ttl};
        }
    }

    /**
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
