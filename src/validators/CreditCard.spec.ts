import "mocha";
import { expect } from "chai";
import { CreditCard } from "./CreditCard";
import { CreditCardItem } from "../core/Types";
import { CreditCardList } from "../utils/CreditCardList";

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

const InvalidCards: string[] = [
  "0000000000000000",
  "1111111111",
  "22222222222",
  "333333333333333333333",
  "444444444444444444",
  "55555555555555",
  "66666666666",
  "77777777777777777777",
  "888888888888888888",
  "99999999999999999"
];

describe("CreditCard", () => {
  it("Should declare the 'validateDigit' method", (done) => {
    expect(CreditCard).to.have.property("validateDigit").to.be.a("function");
    done();
  });

  it("Should declare the 'validateFlag' method", (done) => {
    expect(CreditCard).to.have.property("validateFlag").to.be.a("function");
    done();
  });

  it("Should declare the 'validateModulo' method", (done) => {
    expect(CreditCard).to.have.property("validateModulo").to.be.a("function");
    done();
  });

  it("Should declare the 'getCardFlagName' method", (done) => {
    expect(CreditCard).to.have.property("getCardFlagName").to.be.a("function");
    done();
  });

  it("Should declare the 'filter' method", (done) => {
    expect(CreditCard).to.have.property("filter").to.be.a("function");
    done();
  });

  it("Should declare the 'format' method", (done) => {
    expect(CreditCard).to.have.property("format").to.be.a("function");
    done();
  });

  it("Should declare the 'mask' method", (done) => {
    expect(CreditCard).to.have.property("mask").to.be.a("function");
    done();
  });

  it("Must predeclare the 'MODULO' array, based on the '((n * 2 > 9) ? (n * 2) - 9 : n * 2)' pattern", (done) => {
    for (let n = 0; n < 10; n++) {
      let value = (n === 0) ? 0 : n * 2;
      value = (value > 9) ? value - 9 : value;

      expect(CreditCard.MODULO[n]).to.be.a("number").equal(value);
    }

    done();
  });

  describe("Test Credit Cards", () => {
    let keys: string[] = Object.keys(TestCard);

    it("Sequences of the same digit should validate to `false`", (done) => {
      for (let n = 0; n < InvalidCards.length; n++) {
        expect(CreditCard.validateSequence(InvalidCards[n]))
          .to.be.a("boolean").equal(false);
      }

      done();
    });

    for (let key of keys) {
      let card: TestCardItem = TestCard[key];

      describe(key, () => {
        it("Should validate to `true` against repetitions", (done) => {
          expect(CreditCard.validateSequence(card.number))
            .to.be.a("boolean").equal(true);

          done();
        });

        it(`Should validate '${card.slug}' flag`, (done) => {
          expect(CreditCard.validateFlag(card.number))
            .to.be.a("string").equals(card.slug);
  
          done();
        });
        
        it(`Should validate '${card.slug}' modulo`, (done) => {
          expect(CreditCard.validateModulo(card.number))
            .to.be.a("boolean").equals(true);
          
          done();
        });
        
        it(`Should validate '${card.slug}' digit`, (done) => {
          expect(CreditCard.validateDigit(card.number))
            .to.be.a("boolean").equals(true);
  
          done();
        });

        it(`Should filter '${card.slug}' number and format it`, (done) => {
          let filtered:string = CreditCard.filter(card.number),
              formatted: string = CreditCard.format(card.number), 
              cardItem: CreditCardItem = CreditCardList[key];

          expect(formatted).to.be.a("string")
            .equals(filtered)
            .match(cardItem.groupPattern);

          done();
        });

        it(`Should mask '${card.slug}' number and validate against the mask`, (done) => {
          let masked: string = CreditCard.mask(card.number), 
              cardItem: CreditCardItem = CreditCardList[key];

          expect(masked).to.be.a("string")
            .match(cardItem.mask);

          done();
        });
      });
    }
  });
});
