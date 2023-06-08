/**
 * djb2 incremental hash
 */
export class Djb2Hasher {
  constructor() { this.hash = null; }

  /**
   * Push a string to be hashed
   * @param {string} key 
   * @returns {Djb2Hasher}
   */
  push = (str) => {
    let hash = this.hash ?? 5381;
    let i = str.length;
    while (i--) {
      hash = (hash * 33) ^ (str.charCodeAt(i) & 0xffff);
    }
    this.hash = hash;
    return this;
  }

  /**
   * Get the hash result
   * @returns {number}
   */
  result = () => {
    return this.hash !== 5381 ? this.hash >>> 0 : 0;
  }

  reset = () => {
    this.hash = null;
  }
}
