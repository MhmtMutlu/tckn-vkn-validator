import fetch from "node-fetch";
import { validateTckn, validateTcknNvi, validateVkn } from "../src/index";

global.DOMParser = class {
  parseFromString(xmlString, mimeType) {
    return {
      getElementsByTagName: (tagName) => {
        if (tagName === "TCKimlikNoDogrulaResult") {
          return [{ textContent: "true" }];
        }
        return [];
      },
    };
  }
};

jest.mock("node-fetch", () => jest.fn());

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

  describe("validateTcknNvi", () => {
    beforeEach(() => {
      fetch.mockClear();
    });

    it("should return true for a valid TCKN with correct API response", async () => {
      fetch.mockResolvedValue({
        ok: true,
        text: async () =>
          `<soap:Envelope><soap:Body><TCKimlikNoDogrulaResult>true</TCKimlikNoDogrulaResult></soap:Body></soap:Envelope>`,
      });

      const result = await validateTcknNvi("11111111110", "John", "Doe", 1985);
      expect(result).toBe(true);
    });

    it("should return false for an invalid TCKN", async () => {
      const result = await validateTcknNvi("11111111111", "John", "Doe", 1985);
      expect(result).toBe(false);
    });
  });
});
