import "mocha";
import { expect } from "chai";
import { Phone } from "./Phone";
import {
  Phone as PhoneRegex
} from "../core/Expressions";

describe("Phone", () => {
  it("Should declare the 'filter' method", (done) => {
    expect(Phone).to.have.property("filter").to.be.a("function");
    done();
  });

  it("Should declare the 'format' method", (done) => {
    expect(Phone).to.have.property("format").to.be.a("function");
    done();
  });

  it("Should declare the 'validate' method", (done) => {
    expect(Phone).to.have.property("validate").to.be.a("function");
    done();
  });

  it("Should match brazilian phone and cellphone numbers", (done) => {
    let phoneList = [
      "11999998888",
      "1133334444",
      "(11) 3333-6666",
      "(22) 33334-6666",
      "(11)12349878",
      "(11)12349-8781",
      "(11) 123498781"
    ];

    for (let phone of phoneList) {
      expect(Phone.validate(phone)).to.be.a("boolean").equals(true);
    }

    done();
  });

  it("Should format phones and match the proper pattern", (done) => {
    let phone = "1133334444";

    expect(Phone.format(phone)).to.be.a("string").match(PhoneRegex);

    done();
  });

  it("Should format cellphones and match the proper pattern", (done) => {
    let phone = "11555554444";

    expect(Phone.format(phone)).to.be.a("string").match(PhoneRegex);

    done();
  });

  it("Should filter phones and match the proper pattern", (done) => {
    let phone = "1133334444";

    expect(Phone.filter(phone)).to.be.a("string").match(PhoneRegex);

    done();
  });

  it("Should filter cellphones and match the proper pattern", (done) => {
    let phone = "11555554444";
    
    expect(Phone.filter(phone)).to.be.a("string").match(PhoneRegex);

    done();
  });
});
