import { PaymentCode } from "../src";

describe("PaymentCode", () => {
  it("checks if the name of the recipient is not empty", () => {
    expect(() => {
      new PaymentCode("", "BE71096123456769", 1);
    }).toThrow("Name cannot be empty");
  });

  it("checks if the amount is valid", () => {
    expect(() => {
      new PaymentCode("Name", "BE71096123456769", 0);
    }).toThrow("Amount must be 0.01 or more and 999999999.99 or less");

    expect(() => {
      new PaymentCode("Name", "BE71096123456769", 0.001);
    }).toThrow("Amount must be 0.01 or more and 999999999.99 or less");

    expect(() => {
      new PaymentCode("Name", "BE71096123456769", 1000000000);
    }).toThrow("Amount must be 0.01 or more and 999999999.99 or less");
  });

  it("checks if the provided iban is valid", () => {
    expect(() => {
      new PaymentCode("Name", "BE", 1);
    }).toThrow("Invalid IBAN");

    expect(() => {
      new PaymentCode("Name", "BE81096123456769", 1);
    }).toThrow("Invalid IBAN");
  });

  it("checks if both structured and unstructured text are set", () => {
    expect(() => {
      new PaymentCode("Name", "BE71096123456769", 1, "structured", "unstructured");
    }).toThrow("You can't set structured and unstructured text at the same time");
  });

  it("generates a payload", () => {
    const paymentCode = new PaymentCode("Name", "BE71096123456769", 10.1);
    const payload = paymentCode.getPayload();
    expect(payload).toMatchInlineSnapshot(`
"BCD
002
1
SCT

Name
BE71096123456769
EUR10.1



"
`);
  });

  it("generates a payload with structured text", () => {
    const paymentCode = new PaymentCode("Name", "BE71096123456769", 10.1, "0851927541");
    const payload = paymentCode.getPayload();
    expect(payload).toMatchInlineSnapshot(`
"BCD
002
1
SCT

Name
BE71096123456769
EUR10.1

0851927541

"
`);
  });

  it("generates a payload with unstructured text", () => {
    const paymentCode = new PaymentCode("Name", "BE71096123456769", 10.1, undefined, "Invoice 2018001");
    const payload = paymentCode.getPayload();
    expect(payload).toMatchInlineSnapshot(`
"BCD
002
1
SCT

Name
BE71096123456769
EUR10.1


Invoice 2018001
"
`);
  });
});
