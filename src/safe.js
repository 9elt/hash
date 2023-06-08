import { djb2Pool } from "./instances/djb2.js";

/**
 * A fast, performance focused, 32-bit NON CRYPTOGRAPHIC hash
 *
 * ### performance
 * Speed is comparable to that of `JSON.stringify` method, but significantly faster on smaller objects.
 * 
 * ### notes
 * - If you are **100% sure** that the value you pass in is **NOT a self referencing object**
 * you can use `hashUnsafe` instead, to avoid checks for circular references.
 *
 * @param {any} value
 * @returns {number}
 */
export function hash(value) {
  let hasher = djb2Pool.get();

  switch (typeof value) {
    case "string": hasher.push(value); break;
    case "symbol": hasher.push(value.description); break;
    case "object": rec_hash(value, [], hasher.push); break;
    case "undefined": break;
    default: hasher.push(value + "");
  }

  let res = hasher.result();

  djb2Pool.insert(hasher);

  return res
}

/**
 * @param {object} obj
 * @param {object[]} refs
 * @param {(s: string) => void} hash
 */
function rec_hash(obj, refs, hash) {

  if (obj === null) { return hash("null") }

  if (refs.includes(obj)) { return hash("&") }

  refs.push(obj)

  let k;

  if (Array.isArray(obj)) {

    for (k = 0; k < obj.length; k++) {

      if (obj[k] === undefined) { continue }

      hash(k + "");
      hash((typeof obj[k])[0]);

      switch (typeof obj[k]) {
        case "string": hash(obj[k]); break;
        case "symbol": hash(obj[k].description); break;
        case "object": rec_hash(obj[k], refs, hash); break;
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
        case "object": rec_hash(obj[k], refs, hash); break;
        default: hash(obj[k] + "");
      }

    }

  }
}
