import {
  createHash,
  base58Encoded,
  generateShortURL,
} from "../backend/shortener.js";

describe("[createHash]", () => {
  test("function should be defined", () => {
    expect(createHash).toBeDefined();
  });
  test("should be a function", () => {
    expect(typeof createHash).toBe("function");
  });
  test("function should return a value", () => {
    let url = "hello";
    let hash = createHash(url);
    expect(hash).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
  });
  test("function should not return a different value", () => {
    // ARRANGE
    let url = "https://example123.com/";

    // ACT
    let hash = createHash(url);

    // ASSERT
    expect(hash).not.toEqual({
      data: [230, 99, 72, 29, 99, 1, 247, 161, 28, 56],
      type: "Buffer",
    });
  });
});

describe("[base58Encoded]", () => {
  test("function should be defined", () => {
    expect(base58Encoded).toBeDefined();
  });
  test("should be a function", () => {
    expect(typeof base58Encoded).toBe("function");
  });
  // test("should return a certain value") {

  // }
});

describe("[generateShortURL]", () => {
  test("function should be defined", () => {
    expect(generateShortURL).toBeDefined();
  });
  test("should be a function", () => {
    expect(typeof generateShortURL).toBe("function");
  });
});
