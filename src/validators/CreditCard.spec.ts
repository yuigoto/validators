import "mocha";
import { expect } from "chai";
import { CreditCard } from "./CreditCard";

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

  it("Must predeclare the 'MODULO' array, based on the '((n * 2 > 9) ? (n * 2) - 9 : n * 2)' pattern", done => {
    for (let n = 0; n < 10; n++) {
      let value = (n === 0) ? 0 : n * 2;
      value = (value > 9) ? value - 9 : value;

      expect(CreditCard.MODULO[n]).to.be.a("number").equal(value);
    }

    done();
  });

  describe("Test Credit Cards", () => {
    let keys: string[] = Object.keys(TestCard);

    for (let key of keys) {
      let card: TestCardItem = TestCard[key];

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
    }
  });
});
