import { describe, expect, it } from "bun:test";
import { hash } from "./index";

describe("hash", () => {
    it("should hash consistently", () => {
        expect(hash("")).toBe(177622);

        expect(hash([])).toBe(177610);

        expect(hash({})).toBe(177610);

        expect(hash(undefined)).toBe(5381);

        expect(hash(0)).toBe(5859419);

        expect(hash("0")).toBe(5859398);

        expect(hash(null)).toBe(5861188);

        expect(hash(99)).toBe(193367467);

        expect(hash("foo")).toBe(2087905456);

        expect(hash(true)).toBe(165730225);

        expect(hash({ foo: "bar" })).toBe(3625475054);

        expect(hash(["foo"])).toBe(3848107343);

        expect(hash(new Date(1577836800000))).toBe(1505699739);

        const self = { ref: {} };
        self.ref = self;
        expect(hash(self)).toBe(1351544946);
    });

    it("should not collide", () => {
        expect(hash({ foo: "bar" })).not.toBe({ foob: "ar" });

        expect(hash(["foo", "bar"])).not.toBe(["foob", "ar"]);
    });
});
