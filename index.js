class Hasher extends Uint32Array {
    constructor() {
        super(1);
        this[0] = 5381;
    }
    push = (str) => {
        let i = str.length;
        while (i--)
            this[0] = (this[0] * 33) ^ (str.charCodeAt(i) & 0xffff);
    }
}

/**
 * @param {any} value
 * @returns {number}
 */
export default function hash(value) {
    const hasher = new Hasher();

    route(value, hasher.push);

    return hasher[0];
}

function route(value, push, refs = []) {
    switch (typeof value) {
        case 'string':
            push(value);
            return 's';
        case 'symbol':
            push(value.description);
            return 'sy';
        case 'object':
            hashObject(value, refs, push);
            return 'o';
        case 'undefined':
            return '';
        case 'number':
            push(value.toString());
            return 'n';
        case 'boolean':
            push(value.toString());
            return 'b';
        case 'bigint':
            push(value.toString());
            return 'bn';
        case 'function':
            push(value.toString());
            return 'f';
    }
}

function hashObject(target, refs, push) {
    if (target === null)
        return push('null');

    if (refs.includes(target))
        return push('&');

    refs.push(target);

    for (const key in target)
        push(route(target[key], push, refs));
}
