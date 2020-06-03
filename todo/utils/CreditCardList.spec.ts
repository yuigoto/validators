/**
 * utils/CreditCardList.spec
 * ----------------------------------------------------------------------
 * Tests all `RegExp` patterns from `CreditCardList` against `TestCard`.
 *
 * @since   0.5.0
 */
import { CreditCardList } from "./CreditCardList";
import { expect } from "chai";
import "mocha";

type TestCardItem = {
  slug: string,
  number: string
};

type TestCardList = {
  [key: string]: TestCardItem
};

const TestCard: TestCardList = {
  AMEX: {
    slug: "amex",
    number: "374245455400126"
  },
  DINERS: {
    slug: "diners",
    number: "30569309025904"
  },
  ELO: {
    slug: "elo",
    number: "6362970000457013"
  },
  AURA: {
    slug: "aura",
    number: "5078601870000127985"
  },
  HIPERCARD: {
    slug: "hipercard",
    number: "6062826786276634"
  },
  MASTERCARD: {
    slug: "master",
    number: "5425233430109903"
  },
  VISA: {
    slug: "visa",
    number: "4263982640269299"
  },
  DISCOVER: {
    slug: "discover",
    number: "6011000991300009"
  },
  JCB: {
    slug: "jcb",
    number: "3566000020000410"
  }
};

describe("Credit card list", () => {
  let cardKeys = Object.keys(TestCard);

  describe("Valid C/C numbers", () => {
    for (let n = 0; n < cardKeys.length; n++) {
      let flag = cardKeys[n],
          testData = TestCard[flag],
          cardData = CreditCardList[flag];

      it(`RegExp for "${cardData.name}" should test true and expect "success"`, (done) => {
        let tested = cardData.pattern.test(testData.number);
        expect(tested).to.equal(true);
        done();
      });
    }
  });

  describe("Invalid C/C numbers", () => {
    for (let n = 0; n < cardKeys.length; n++) {
      let flag = cardKeys[n],
          cardData = CreditCardList[flag];

      it(`RegExp for "${cardData.name}" should test false`, (done) => {
        let tested = cardData.pattern.test("894512389764132456789");

        expect(tested).to.equal(false);
        done();
      });
    }
  });
});
