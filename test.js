import hash from '.';


let failed = 0;


assert('', 177622);


assert([], 177610);


assert({}, 177610);


assert(undefined, 5381);


assert(0, 5859419);


assert('0', 5859398);


assert(null, 173297809);


assert(99, 193367467);


assert('foo', 2087905456);


assert(true, 165730225);


assert({ foo: 'bar' }, 194661000);


assert(["foo"], 181403359);


const self_ref = {};

self_ref.self = self_ref;

assert(self_ref, 193337187);



if (failed) {
    console.log('\n' + failed, 'tests have failed\n');
    process.exit(1);
}

export function assert(target, expected) {
    const result = hash(target);

    if (result !== expected)
        ++failed && console.log(
            '\nfailed',
            '\n  target -> ', typeof target === 'object' ? target : target + "",
            '\n  expected -> ', expected,
            '\n  got -> ', result,
            '\n'
        );
}