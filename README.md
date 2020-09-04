   
        .___ _____                    .__            
      __| _// ____\____ _____    ____ |  |__   ____  
     / __ |\   __\/ ___\\__  \ _/ ___\|  |  \_/ __ \ 
    / /_/ | |  | \  \___ / __ \\  \___|   Y  \  ___/ 
    \____ | |__|  \___  >____  /\___  >___|  /\___  >
         \/           \/     \/     \/     \/     \/ 

---

Dependency-free cache for Node.js applications.

## Usage

import package and initialize cache

```
const cache = require('path/to/dfcache');
const myCache = new cache();
```

### Options (Under Development)
`ttl`: Time in seconds for the cache to live. (default: 0 - unlimited)

Add key and value to cache
```
myCache.add('myKey', 50, [ttl]);
```

Get key
```
myCache.get('myKey');
// 50
```

Update key
```
myCache.update('myKey', 'updated key');
```

Delete key from cache
```
myCache.delete('myKey');
```

Clear cache
```
myCache.clear();
```

check for events
```
myCache.cacheEvent.on('expired', (key) => {
    console.log(`${key} has expired`);
})
```

### List of Events (Under development)

`purged`: sent when cache has been cleared. 

`expired`: sent when key has expired. Returns expired key. 