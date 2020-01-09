import "mocha";
import { expect } from "chai";
import { Cep } from "./Cep";
import {
  Cep as CepRegex
} from "../core/Expressions";

describe("CEP", () => {
  it("Should declare the 'filter' method", (done) => {
    expect(Cep).to.have.property("filter").to.be.a("function");
    done();
  });

  it("Should declare the 'format' method", (done) => {
    expect(Cep).to.have.property("format").to.be.a("function");
    done();
  });

  it("Should declare the 'validate' method", (done) => {
    expect(Cep).to.have.property("validate").to.be.a("function");
    done();
  });

  let cepList = [
    "99999999",
    "26147-131",
    "67128677",
    "12124-356"
  ];

  it("Should validate valid CEP-like strings", (done) => {
    for (let n of cepList) {
      expect(Cep.validate(n)).to.be.a("boolean").equals(true);
    }

    done();
  });

  it("Should filter valid CEP-like strings against the proper regex", (done) => {
    for (let n of cepList) {
      expect(Cep.filter(n)).to.be.a("string").match(CepRegex);
    }

    done();
  });

  it("Should format valid CEP-like strings against the proper regex", (done) => {
    for (let n of cepList) {
      expect(Cep.format(n)).to.be.a("string").match(CepRegex);
    }

    done();
  });
});
