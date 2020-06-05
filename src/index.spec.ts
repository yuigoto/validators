import "mocha";
import { expect } from "chai";
import validators from "./index";

/**
 * Lists the names of all validators exported by the library.
 */
const validatorsList: string[] = [
  "Cep",
  "Cnpj",
  "Cpf",
  "CreditCard",
  "DateString",
  "Email",
  "Phone",
  "Pis",
  "Url"
];

describe("@yuigoto/validators", () => {
  for (let validator of validatorsList) {
    it(`Default export should have the '${validator}' helper`, (done) => {
      expect(validators).to.have.property(validator).to.be.a("function");
      done();
    });
  }
});
