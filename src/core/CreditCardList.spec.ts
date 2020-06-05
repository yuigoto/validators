import "mocha";
import { expect } from "chai";

import { CreditCardList } from "./CreditCardList";
import { HashMap } from "../type/HashMap";

let creditCardFlagKeys: string[] = [
  "AMEX",
  "DINERS",
  "VISA",
  "MASTERCARD",
  "ELO",
  "HIPERCARD",
  "AURA",
  "JCB",
  "DISCOVER"
];

let flagItemProp: HashMap<string> = {
  name: "string",
  slug: "string",
  pattern: "object",
  groupPattern: "object",
  mask: "object"
};

describe("CreditCardList", () => {
  // FLAGS
  // --------------------------------------------------------------------

  describe("Exported flags", () => {
    for (let flag of creditCardFlagKeys) {
      it(`Should export the '${flag}' object`, (done) => {
        expect(CreditCardList).to.have.property(flag).to.be.an("object");

        done();
      });

      describe(`'${flag}' properties`, () => {
        const flagData = CreditCardList[flag];

        console.log(flagData);
        for (let key of Object.keys(flagItemProp)) {
          it(`'${flag}' must declare the '${key}' property of type '${flagItemProp[key]}'`, (done) => {
            expect(flagData).to.have.property(key).to.be.a(flagItemProp[flag]);
            done();
          });
        }
      });
    }
  });
});
