/** 
 * @template {abstract new (...args: any) => any} T 
 */
export class Pool {
  /**
   * @param {T} Template 
   * @param {{ 
   *    size_limit?: number,
   *    reset_key?: string
   * }} options 
   */
  constructor(Template, options) {
    this._Template = Template;
    this._limit = options.size_limit;
    this._reset_key = options.reset_key ?? "reset";
    this._items = [];
  }

  /**
   * Get an object from the pool
   * 
   * @returns {InstanceType<T>}
   */
  get = () => {
    return this._items != 0
      ? this._items.pop()
      : new this._Template();
  }

  /**
   * Return an object to the pool
   * 
   * @param {InstanceType<T>} obj 
   * @returns {Pool<T>}
   */
  insert = (obj) => {
    if (
      !this._limit ||
      this._items.length <= this._limit
    ) {
      obj[this._reset_key]();
      this._items.push(obj);
    }
    return this;
  }
}
