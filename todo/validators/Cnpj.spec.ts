import "mocha";
import { expect } from "chai";
import { Cnpj } from "./Cnpj";
import {
  Cnpj as CnpjRegex
} from "../core/Expressions";

const generateRandom = (): string => {
  let _cnpj: string = "",
      _numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let n = 0; n < 8; n++) {
    _cnpj += _numbers[Math.floor(Math.random() * _numbers.length)].toString();
  }

  _cnpj += "0001";

  let sum: number, 
      val: number;

  sum = 0;
  val = 5;
  for (var l = 0; l < 12; l++) {
    sum += parseInt(_cnpj[l]) * val;
    val = ((val - 1) === 1) ? 9 : val - 1;
  }
  val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  _cnpj += val.toString();

  sum = 0;
  val = 6;
  for (var l = 0; l < 13; l++) {
    sum += parseInt(_cnpj[l]) * val;
    val = ((val - 1) === 1) ? 9 : val - 1;
  }
  val = (sum % 11 < 2) ? 0 : 11 - (sum % 11);
  _cnpj += val.toString();

  return _cnpj;
}

describe("CNPJ", () => {
  it("Should declare the 'filter' method", (done) => {
    expect(Cnpj).to.have.property("filter").to.be.a("function");
    done();
  });

  it("Should declare the 'format' method", (done) => {
    expect(Cnpj).to.have.property("format").to.be.a("function");
    done();
  });

  it("Should declare the 'validate' method", (done) => {
    expect(Cnpj).to.have.property("validate").to.be.a("function");
    done();
  });

  it("'validate' and 'format' shouldn't accept anything but numbers or filled strings", (done) => {
    let invalidValues = [
      true,
      false,
      null,
      undefined,
      ""
    ];

    for (let n of invalidValues) {
      expect(Cnpj.format(n)).to.be.a("boolean").equals(false);
      expect(Cnpj.validate(n)).to.be.a("boolean").equals(false);
    }

    done();
  });

  it("Should validate a 'valid' number", (done) => {
    for (let n = 0; n < 10; n++) {
      let _cnpj: string = generateRandom();

      expect(Cnpj.validate(_cnpj)).to.be.a("boolean").equals(true);
    }

    done();
  });

  it("Should not validate repeated sequences of the same number", (done) => {
    for (let n = 0; n < 10; n++) {
      let _str = "";
      while (_str.length < 14) {
        _str += n;
      }
      expect(Cnpj.validate(_str)).to.be.a("boolean").equals(false);
    }

    done();
  });

  it("Should format the number and match the proper pattern", (done) => {
    for (let n = 0; n < 10; n++) {
      let _cnpj: string = generateRandom();
      
      expect(Cnpj.format(_cnpj)).to.be.a("string").match(CnpjRegex);
    }

    done();
  });

  it("Should filter the number and match the proper pattern", (done) => {
    for (let n = 0; n < 10; n++) {
      let _cnpj: string = generateRandom();
      
      expect(Cnpj.filter(_cnpj)).to.be.a("string").match(CnpjRegex);
    }

    done();
  });
});
