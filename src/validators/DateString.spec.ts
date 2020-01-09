import "mocha";
import { expect } from "chai";
import { DateString } from "./DateString";
import { RegularDate } from "../core/Expressions";

describe("DateString", () => {
  it("Should declare the 'filter' method", (done) => {
    expect(DateString).to.have.property("filter").to.be.a("function");
    done();
  });

  it("Should declare the 'format' method", (done) => {
    expect(DateString).to.have.property("format").to.be.a("function");
    done();
  });

  it("Should declare the 'validate' method", (done) => {
    expect(DateString).to.have.property("validate").to.be.a("function");
    done();
  });

  it("Should validate 'valid' date strings in the DD/MM/YYYY format", (done) => {
    let dateList = [
      "30031974",
      "24/10/1965",
      "09/12/1901"
    ];

    for (let n of dateList) {
      expect(DateString.validate(n)).to.be.a("boolean").equals(true);
    }

    done();
  });

  it("Should return false for invalid date strings in the DD/MM/YYYY format", (done) => {
    let dateList = [
      "23151946",
      "45101940",
      "46/13/1930"
    ];

    for (let n of dateList) {
      expect(DateString.validate(n)).to.be.a("boolean").equals(false);
    }

    done();
  });

  it("Should return false for invalid or other values", (done) => {
    let dateList = [
      "uyahefhw",
      "8957982375g2",
      false,
      null,
      undefined,
      ""
    ];

    for (let n of dateList) {
      expect(DateString.validate(n)).to.be.a("boolean").equals(false);
    }

    done();
  });

  it("Should format valid dates and match the proper regex", (done) => {
    let dateList = [
      "30031974",
      "24/10/1965",
      "09/12/1901"
    ];

    for (let n of dateList) {
      expect(DateString.format(n)).to.be.a("string").match(RegularDate);
    }

    done();
  });

  it("Should filter valid dates and match the proper regex", (done) => {
    let dateList = [
      "30031974",
      "24/10/1965",
      "09/12/1901"
    ];

    for (let n of dateList) {
      expect(DateString.filter(n)).to.be.a("string").match(RegularDate);
    }

    done();
  });
});
