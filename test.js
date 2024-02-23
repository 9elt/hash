import hash from '.';


let failed = 0;


assert('', 5381);


assert([], 5381);


assert({}, 5381);


assert(undefined, 5381);


assert(0, 177557);


assert('0', 177557);


assert(null, 2087659838);


assert(99, 5859621);


assert('foo', 193420387);


assert(true, 2087430515);


assert({ foo: 'bar' }, 2088307207);


assert(["foo"], 2087905456);


const self_ref = {};

self_ref.self = self_ref;

assert(self_ref, 5858700);



if (failed) {
    console.log('\n' + failed, 'tests have failed\n');
    process.exit(1);
}

export function assert(target, expected) {
    const result = hash(target);

    if (result !== expected)
        ++failed && console.log(
            '\nfailed',
            '\n  target -> ', target,
            '\n  expected -> ', expected,
            '\n  got -> ', result,
            '\n'
        );
}
