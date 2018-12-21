import * as IBAN from "iban";

export class PaymentCode {
  private name: string;
  private readonly amount: number;
  private iban: string;
  private structuredText: string = "";
  private unstructuredText: string = "";

  constructor(name: string, iban: string, amount: number, structuredText?: string, unstructuredText?: string) {
    if (!name) {
      throw new Error("Name cannot be empty");
    }

    if (!IBAN.isValid(iban)) {
      throw new Error("Invalid IBAN");
    }

    if (amount < 0.01 || amount > 999999999.99) {
      throw new Error("Amount must be 0.01 or more and 999999999.99 or less");
    }

    this.name = name;
    this.amount = amount;
    this.iban = iban;

    if (structuredText && unstructuredText) {
      throw new Error("You can't set structured and unstructured text at the same time");
    }

    if (structuredText) {
      this.structuredText = structuredText;
    } else if (unstructuredText) {
      this.unstructuredText = unstructuredText;
    }
  }

  getPayload(): string {
    const serviceTag = "BCD";
    const version = "002";
    const characterSet = 1;
    const identification = "SCT";
    const bic = "";
    const amount = "EUR" + this.amount;
    const purpose = "";
    const information = "";

    return [
      serviceTag,
      version,
      characterSet,
      identification,
      bic,
      this.name,
      this.iban.replace(/ /g, ""),
      amount,
      purpose,
      this.structuredText,
      this.unstructuredText,
      information,
    ].join("\n");
  }
}
