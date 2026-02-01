export function hash(value: unknown): number {
    return _unk(value, 5381) >>> 0;
}

function _unk(value: unknown, h: number, refs?: WeakSet<object>): number {
    switch (typeof value) {
        case "string":
            return _str("s", _str(value, h));
        case "symbol":
            return _str("m", _str(value.description || "", h));
        case "object":
            return _str("o", _obj(value, h, refs || new WeakSet));
        case "undefined":
            return h;
        case "number":
            return _str("n", _str(value.toString(), h));
        case "boolean":
            return _str("b", _str(value.toString(), h));
        case "bigint":
            return _str("i", _str(value.toString(), h));
        case "function":
            return _str("f", _str(value.toString(), h));
    }
}

function _obj(value: object | null, h: number, refs: WeakSet<object>): number {
    if (value === null) {
        return _str("n", h);
    }
    if (value instanceof Date) {
        return _str(value.getTime().toString(), h);
    }
    if (refs.has(value)) {
        return _str("&", h);
    }
    refs.add(value);
    for (const key in value) {
        h = _str(key, h);
        h = _unk(value[key], h, refs)
    }
    return h;
}

function _str(str: string, h: number): number {
    let i = str.length;
    while (i--) {
        h = (h * 33) ^ (str.charCodeAt(i) & 0xffff);
    }
    return h;
}
