# Hash

A fast, performance focused, 32-bit non cryptographic hash

### example
```javascript
import hash from "@9elt/hash";

hash({ foo: "bar" }); //4274701217
hash("foo"); //193420387
hash(window); //1359392784
```

There is a faster *"unsafe"* version,
that doesn't check for self references in objects.

```javascript
import { hashUnsafe } from "@9elt/hash";

hashUnsafe({ foo: "bar" }); //4274701217
// ! this will cause an infinite recursion
hashUnsafe(window);
```

### limitations
* You can hash pretty much everything, however, some classes (e.g. `ArrayBuffer`) are not supported and will hash to 0, if you need something more versatile you can use [hash-it](https://github.com/planttheidea/hash-it)
* Hashes (especially those involving functions) may not be consistent across different environments

### performance
Speed is comparable to that of `JSON.stringify` method, but generally significantly faster on smaller objects.
