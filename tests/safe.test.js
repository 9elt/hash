const hash = require("../dist/cjs/index").default;

describe("safe hash consistency", () => {
  test("empty string hash", () => {
    expect(hash("")).toEqual(0);
  });

  test("empty array hash", () => {
    expect(hash([])).toEqual(0);
  });

  test("empty object hash", () => {
    expect(hash({})).toEqual(0);
  });

  test("undefined hash", () => {
    let _; expect(hash(_)).toEqual(0);
  });

  test("null hash", () => {
    expect(hash(null)).toEqual(2087659838);
  });

  test("null hash", () => {
    expect(hash(null)).toEqual(2087659838);
  });

  test("number hash", () => {
    expect(hash(2)).toEqual(177559);
  });

  test("string hash", () => {
    expect(hash("foo")).toEqual(193420387);
  });

  test("object hash", () => {
    expect(hash({ foo: "bar" })).toEqual(4274701217);
  });

  test("cyclic object hash", () => {
    let c = {}; c.self = c;
    expect(hash(c)).toEqual(1359392784);
  });
});
