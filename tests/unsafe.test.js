const hashUnsafe = require("../dist/cjs/index").hashUnsafe;

describe("unsafe hash consistency", () => {
  test("empty string hash", () => {
    expect(hashUnsafe("")).toEqual(0);
  });

  test("empty array hash", () => {
    expect(hashUnsafe([])).toEqual(0);
  });

  test("empty object hash", () => {
    expect(hashUnsafe({})).toEqual(0);
  });

  test("undefined hash", () => {
    let _; expect(hashUnsafe(_)).toEqual(0);
  });

  test("null hash", () => {
    expect(hashUnsafe(null)).toEqual(2087659838);
  });

  test("null hash", () => {
    expect(hashUnsafe(null)).toEqual(2087659838);
  });

  test("number hash", () => {
    expect(hashUnsafe(2)).toEqual(177559);
  });

  test("string hash", () => {
    expect(hashUnsafe("foo")).toEqual(193420387);
  });

  test("object hash", () => {
    expect(hashUnsafe({ foo: "bar" })).toEqual(4274701217);
  });
});
