import { validateTckn, validateVkn } from "../src/index";

describe("Validation Functions", () => {
  describe("validateTckn", () => {
    it("should return true for a valid TCKN", () => {
      expect(validateTckn("11111111110")).toBe(true);
    });

    it("should return false for an invalid TCKN", () => {
      expect(validateTckn("12345678902")).toBe(false);
    });
  });

  describe("validateVkn", () => {
    it("should return true for a valid VKN", () => {
      expect(validateVkn("1430466081")).toBe(true);
    });

    it("should return false for an invalid VKN", () => {
      expect(validateVkn("1234567891")).toBe(false);
    });
  });
});
