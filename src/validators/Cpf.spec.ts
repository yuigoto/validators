import "mocha";
import { expect } from "chai";
import { Cpf } from "./Cpf";
import {
  Cpf as CpfRegex
} from "../core/Expressions";

const generateRandom = (): string => {
  let _cpf: string = "",
      _numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let n = 0; n < 9; n++) {
    _cpf += _numbers[Math.floor(Math.random() * _numbers.length)].toString();
  }

  let sum: number = 0,
      val: number = 0;
  
  for (var l = 0; l < 9; l++) {
    sum += parseInt(_cpf[l]) * (10 - l);
  }
  val = 11 - (sum % 11);
  if (val === 10 || val === 11) val = 0;
  _cpf += val.toString();

  sum = 0;
  for (var l = 0; l < 10; l++) {
    sum += parseInt(_cpf[l]) * (11 - l);
  }
  val = 11 - (sum % 11);
  if (val === 10 || val === 11) val = 0;
  _cpf += val.toString();

  return _cpf;
}

describe("CPF", () => {
  it("Should declare the 'filter' method", (done) => {
    expect(Cpf).to.have.property("filter").to.be.a("function");
    done();
  });

  it("Should declare the 'format' method", (done) => {
    expect(Cpf).to.have.property("format").to.be.a("function");
    done();
  });

  it("Should declare the 'validate' method", (done) => {
    expect(Cpf).to.have.property("validate").to.be.a("function");
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
      expect(Cpf.format(n)).to.be.a("boolean").equals(false);
      expect(Cpf.validate(n)).to.be.a("boolean").equals(false);
    }

    done();
  });

  it("Should validate a 'valid' number", (done) => {
    for (let n = 0; n < 10; n++) {
      let _cpf:string = generateRandom();

      expect(Cpf.validate(_cpf)).to.be.a("boolean").equals(true);
    }

    done();
  });

  it("Should not validate repeated sequences of the same number", (done) => {
    for (let n = 0; n < 10; n++) {
      let _str = "";
      while (_str.length < 11) {
        _str += n;
      }
      expect(Cpf.validate(_str)).to.be.a("boolean").equals(false);
    }

    done();
  });

  it("Should format the number and match the proper pattern", (done) => {
    for (let n = 0; n < 10; n++) {
      let _cpf:string = generateRandom();
      
      expect(Cpf.format(_cpf)).to.be.a("string").match(CpfRegex);
    }

    done();
  });

  it("Should filter the number and match the proper pattern", (done) => {
    for (let n = 0; n < 10; n++) {
      let _cpf:string = generateRandom();
      
      expect(Cpf.filter(_cpf)).to.be.a("string").match(CpfRegex);
    }

    done();
  });
});
