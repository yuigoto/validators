import "mocha";
import { expect } from "chai";
import { Email } from "./Email";

describe("Email", () => {
  it("Should declare the 'validate' method", (done) => {
    expect(Email).to.have.property("validate").to.be.a("function");
    done();
  });

  it("'validate' shouldn't accept anything but numbers or filled strings", (done) => {
    let invalidValues = [
      true,
      false,
      null,
      undefined,
      ""
    ];

    for (let n of invalidValues) {
      expect(Email.validate(n)).to.be.a("boolean").equals(false);
    }

    done();
  });

  it("My own email address should validate (lab@yuiti.dev)", (done) => {
    expect(Email.validate("lab@yuiti.dev")).to.be.a("boolean").equals(true);
    done();
  });

  it("Should work for different domain types", done => {
    let domains = [
      ".com",
      ".com.br",
      ".net",
      ".bradecso",
      ".moe",
      ".vlaanderen",
      ".localhost",
      ".onion",
      ".amsterdam",
      ".gz"
    ];

    for (let n in domains) {
      expect(Email.validate("test.email.address@website" + domains[n]))
        .to.be.a("Boolean").equals(true);
    }

    done();
  });
});
