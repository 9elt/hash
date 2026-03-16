import { describe, expect, it } from "bun:test";
import { unknown } from "./index";

describe("unknown", () => {
    it("should hash consistently", () => {
        expect(unknown("")).toBe(177622);

        expect(unknown([])).toBe(177610);

        expect(unknown({})).toBe(177610);

        expect(unknown(undefined)).toBe(5381);

        expect(unknown(0)).toBe(5859419);

        expect(unknown("0")).toBe(5859398);

        expect(unknown(null)).toBe(5861188);

        expect(unknown(99)).toBe(193367467);

        expect(unknown("foo")).toBe(2087905456);

        expect(unknown(true)).toBe(165730225);

        expect(unknown({ foo: "bar" })).toBe(-669492242);

        expect(unknown(["foo"])).toBe(-446859953);

        expect(unknown(new Date(1577836800000))).toBe(1505699739);

        const self = { ref: {} };
        self.ref = self;
        expect(unknown(self)).toBe(1351544946);

        const hash = unknown({
            string: "Hello World!",
            number: 42,
            float: 3.14159,
            negative: -123,
            zero: 0,
            booleanTrue: true,
            booleanFalse: false,
            nullValue: null,
            undefinedValue: undefined,
            bigint: BigInt("9007199254740993"),
            symbol: Symbol("test"),
            nan: NaN,
            infinity: Infinity,
            negativeInfinity: -Infinity,
            arrayNumbers: [1, 2, 3],
            arrayMixed: [1, "two", true, null, undefined],
            nestedArray: [
                [1, 2],
                [3, 4],
                5
            ],
            deepArray: [
                [
                    [
                        ["deep"]
                    ]
                ]
            ],
            simpleObject: {
                a: 1,
                b: "two",
                c: true
            },
            nestedObject: {
                level1: {
                    level2: {
                        level3: {
                            value: "deep"
                        }
                    }
                }
            },
            objectWithArray: {
                users: [
                    { id: 1, name: "Alice" },
                    { id: 2, name: "Boclair" }
                ]
            },
            date: new Date("2000-01-01T00:00:00.000Z"),
            regex: /test\d+/gi,
            map: new Map<string, unknown>([
                ["key1", "value1"],
                ["key2", 123],
                ["key3", { nested: true }]
            ]),
            set: new Set([1, 2, 3, 4]),
            uint8Array: new Uint8Array([1, 2, 3, 4]),
            int16Array: new Int16Array([10, 20, 30]),
            float32Array: new Float32Array([1.1, 2.2, 3.3]),
            arrayBuffer: new ArrayBuffer(8),
            dataView: new DataView(new ArrayBuffer(16)),
            functionValue: function (a: number, b: number) {
                return a + b;
            },
            arrowFunction: (x: number) => x * 2,
            asyncFunction: async function () {
                return "async result";
            },
            generatorFunction: function* () {
                yield 1;
                yield 2;
            },
            promise: Promise.resolve("resolved"),
            classInstance: new (class TestClass {
                x = 10;
                y = 20;
                sum() {
                    return this.x + this.y;
                }
            })(),
            error: new Error("Something went wrong"),
            url: new URL("https://example.com/path?query=1"),
            weakMap: new WeakMap(),
            weakSet: new WeakSet(),
            circular: (() => {
                const obj: any = { name: "circular" };
                obj.self = obj;
                return obj;
            })(),
            sparseArray: [1, , , 4],
            complex: {
                arr: [
                    { a: 1 },
                    new Map([
                        ["nestedMap", new Set([1, 2, 3])]
                    ]),
                    [
                        Promise.resolve(1),
                        new Date("2001-02-03T04:05:06.000Z")
                    ]
                ],
                meta: {
                    created: new Date("1999-12-31T23:59:59.000Z"),
                    flags: new Set(["a", "b", "c"])
                }
            }
        });

        expect(hash).toBe(1968289662);
    });

    it("should not collide", () => {
        expect(unknown({ foo: "bar" })).not.toBe({ foob: "ar" });

        expect(unknown(["foo", "bar"])).not.toBe(["foob", "ar"]);
    });
});
