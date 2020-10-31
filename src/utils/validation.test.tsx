import { isEmpty, isValidAddress } from "./validation";

describe("isEmpty", () => {
  it("input value is blank.", () => {
    const result = isEmpty("");
    expect(result).toEqual(true);
  });
  it("input value is null.", () => {
    const result = isEmpty(null);
    expect(result).toEqual(true);
  });
  it("input value is whitespace.", () => {
    const result = isEmpty(" ");
    expect(result).toEqual(false);
  });
  it("input value is not blank.", () => {
    const result = isEmpty("hoge");
    expect(result).toEqual(false);
  });
});

describe("isValidAddress", () => {
  it("Valid address.", () => {
    const result = isValidAddress("hoge", 100);
    expect(result).toEqual(true);
  });
  it("invalid address.", () => {
    const result = isValidAddress(
      "hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge",
      100
    );
    expect(result).toEqual(false);
  });
});
