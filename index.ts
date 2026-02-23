export function unknown(
    value: unknown,
    hash: number = 5381,
    refs?: WeakSet<object>,
): number {
    switch (typeof value) {
        case "string":
            return string("s", string(value, hash));
        case "symbol":
            return string("m", string(value.description || "", hash));
        case "object":
            return string("o", object(value, hash, refs || new WeakSet));
        case "undefined":
            return hash;
        case "number":
            return string("n", string(value.toString(), hash));
        case "boolean":
            return string("b", string(value.toString(), hash));
        case "bigint":
            return string("i", string(value.toString(), hash));
        case "function":
            return string("f", string(value.toString(), hash));
    }
}

export function object(
    value: object | null,
    hash: number = 5381,
    refs: WeakSet<object> = new WeakSet,
): number {
    if (value === null) {
        return string("n", hash);
    }
    if (value instanceof Date) {
        return string(value.getTime().toString(), hash);
    }
    if (refs.has(value)) {
        return string("&", hash);
    }
    refs.add(value);
    for (const key in value) {
        hash = string(key, hash);
        hash = unknown(value[key as keyof object], hash, refs)
    }
    return hash;
}

export function string(
    value: string,
    hash: number = 5381,
): number {
    let i = value.length;
    while (i--) {
        hash = (hash * 33) ^ (value.charCodeAt(i) & 0xffff);
    }
    return hash;
}
