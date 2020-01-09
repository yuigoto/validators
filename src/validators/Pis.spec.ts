import "mocha";
import { expect } from "chai";
import { Pis } from "./Pis";
import {
  Pis as PisRegex
} from "../core/Expressions";

const generateRandom = (): string => {
  let _pis: string = "";
  let _numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let n = 0; n < 10; n++) {
    _pis += _numbers[Math.floor(Math.random() * _numbers.length)].toString();
  }

  let sum: number, 
      val: number, 
      multiplier: number;

  multiplier = 3;
  sum = 0;

  for (var l = 0; l < 10; l++) {
    sum += multiplier * parseInt(_pis[l]);

    multiplier -= 1;
    if (multiplier === 1) multiplier = 9;
  }

  val = 11 - (sum % 11);
  val = (val === 10 || val === 11) ? 0 : val;
  _pis += val.toString();

  return _pis;
}

describe("PIS", () => {
  it("Should declare the 'filter' method", (done) => {
    expect(Pis).to.have.property("filter").to.be.a("function");
    done();
  });

  it("Should declare the 'format' method", (done) => {
    expect(Pis).to.have.property("format").to.be.a("function");
    done();
  });

  it("Should declare the 'validate' method", (done) => {
    expect(Pis).to.have.property("validate").to.be.a("function");
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
      expect(Pis.format(n)).to.be.a("boolean").equal(false);
      expect(Pis.validate(n)).to.be.a("boolean").equal(false);
    }

    done();
  });

  it("Should validate a 'valid' number", (done) => {
    for (let n = 0; n < 10; n++) {
      let _pis:string = generateRandom();

      expect(Pis.validate(_pis)).to.be.a("boolean").equals(true);
    }

    done();
  });

  it("Should not validate repeated sequences of the same number", (done) => {
    for (let n = 0; n < 10; n++) {
      let _str = "";
      while (_str.length < 11) {
        _str += n;
      }
      expect(Pis.validate(_str)).to.be.a("boolean").equals(false);
    }

    done();
  });

  it("Should format the number and match the proper pattern", (done) => {
    for (let n = 0; n < 10; n++) {
      let _pis = generateRandom();
      
      expect(Pis.format(_pis)).to.be.a("string").match(PisRegex);
    }

    done();
  });

  it("Should filter the number and match the proper pattern", (done) => {
    for (let n = 0; n < 10; n++) {
      let _pis = generateRandom();
      
      expect(Pis.filter(_pis)).to.be.a("string").match(PisRegex);
    }

    done();
  });
});
