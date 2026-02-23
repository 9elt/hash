import { describe, expect, it } from "bun:test";
import { unknown } from "./index";

describe("unknown", () => {
    it("should unknown consistently", () => {
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
    });

    it("should not collide", () => {
        expect(unknown({ foo: "bar" })).not.toBe({ foob: "ar" });

        expect(unknown(["foo", "bar"])).not.toBe(["foob", "ar"]);
    });
});
