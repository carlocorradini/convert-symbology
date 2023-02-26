import { describe, expect, it } from "vitest";
import { convertNumberSidc2LetterSidc } from "../lib/convert";

describe("Convert from number to letters", function () {
  it("conversion function is exported", () => {
    expect(convertNumberSidc2LetterSidc).toBeDefined();
  });

  it("frigate", () => {
    const { sidc, success } = convertNumberSidc2LetterSidc(
      "10033000001202040000"
    );
    expect(sidc).toBe("SFSPCLFF--------");
    expect(success).toBe(true);
  });

  it("arctic infantry squad", () => {
    expect(convertNumberSidc2LetterSidc("10031000111211000002").sidc).toBe(
      "SFGPUCIC---A---"
    );
  });

  it("arctic infantry company", () => {
    expect(convertNumberSidc2LetterSidc("10031000151211000002").sidc).toBe(
      "SFGPUCIC---E---"
    );
  });

  it("returns match=exact if exact", () => {
    const { success, match } = convertNumberSidc2LetterSidc(
      "10031000111211000002"
    );
    expect(success).toBe(true);
    expect(match).toBe("exact");
  });

  it("returns match=failed if complete failure", () => {
    const { success, match } = convertNumberSidc2LetterSidc(
      "10032700001101010500"
    );
    expect(success).toBe(false);
    expect(match).toBe("failed");
  });

  it("returns match=partial if partial", () => {
    const { sidc, success, match } = convertNumberSidc2LetterSidc(
      "10031000001211002004"
    );
    expect(sidc).toBe("SFGPUCI---------");
    expect(success).toBe(false);
    expect(match).toBe("partial");
  });
});
