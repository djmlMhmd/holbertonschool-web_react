const { getFullYear } = require("./utils");

test("getFullYear returns the correct year", () => {
    const staticYear = 2024;

    const result = getFullYear();

    expect(result).toBe(staticYear);
})