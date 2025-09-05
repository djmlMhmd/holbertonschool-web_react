import { getFullYear, getFooterCopy, getLatestNotification } from "./utils";

describe("getFullyear", function () {
  it("return the current year", () => {
    const currentYear = new Date().getFullYear();
    expect(getFullYear()).toBe(currentYear);
  });
});

describe("getFooterCopy", function () {
  it("return correct string when true", function () {
    const stringTrue = getFooterCopy(true);
    expect(getFooterCopy(true)).toEqual(stringTrue);
  });

  it("return correct string when false", function () {
    const stringFalse = getFooterCopy(false);
    expect(getFooterCopy(false)).toEqual(stringFalse);
  });
});

describe("getLatestNotification", function () {
  it("return the correct string HTML", function () {
    const stringHTML = getLatestNotification();
    expect(getLatestNotification()).toEqual(stringHTML);
  });
});
