import { djb2Pool } from "./instances/djb2.js";

/**
 * A fast, performance focused, 32-bit NON CRYPTOGRAPHIC hash
 * 
 * ### ! infinite recursion risk
 * This function has no checks for circular references,
 * passing a self referencing object will therefore cause an **infinite recursion**.
 * If you have any doubts use `hash` instead.
 *
 * @param {any} value
 * @returns {number}
 */
export function hashUnsafe(value) {
  let hasher = djb2Pool.get();

  switch (typeof value) {
    case "string": hasher.push(value); break;
    case "symbol": hasher.push(value.description); break;
    case "object": rec_hash_unsafe(value, hasher.push); break;
    case "undefined": break;
    default: hasher.push(value + "");
  }

  let res = hasher.result();

  djb2Pool.insert(hasher);

  return res
}

/**
 * @param {object} obj
 * @param {(s: string) => void} hash
 */
function rec_hash_unsafe(obj, hash) {

  if (obj === null) {
    return hash("null")
  }

  let k;

  if (Array.isArray(obj)) {

    for (k = 0; k < obj.length; k++) {

      if (obj[k] === undefined) { continue }

      hash(k + "");
      hash((typeof obj[k])[0]);

      switch (typeof obj[k]) {
        case "string": hash(obj[k]); break;
        case "symbol": hash(obj[k].description); break;
        case "object": rec_hash_unsafe(obj[k], hash); break;
        default: hash(obj[k] + "");
      }
    }

  } else {

    for (k in obj) {

      // In some very remote cases `obj[k]` might not be accessible
      try { if (obj[k] === undefined) { continue } } catch { continue }

      hash(k);
      hash((typeof obj[k])[0]);

      switch (typeof obj[k]) {
        case "string": hash(obj[k]); break;
        case "symbol": hash(obj[k].description); break;
        case "object": rec_hash_unsafe(obj[k], hash); break;
        default: hash(obj[k] + "");
      }

    }

  }
}
