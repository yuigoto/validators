import "mocha";
import { expect } from "chai";
import validators from "../reviuew";

describe("@yuigoto/validators", () => {
  it("Should export the 'Cep' validator helper", (done) => {
    expect(validators).to.have.property("Cep").to.be.a("function");

    done();
  });

  it("Should export the 'Cnpj' validator helper", (done) => {
    expect(validators).to.have.property("Cnpj").to.be.a("function");

    done();
  });

  it("Should export the 'Cpf' validator helper", (done) => {
    expect(validators).to.have.property("Cpf").to.be.a("function");

    done();
  });

  it("Should export the 'CreditCard' validator helper", (done) => {
    expect(validators).to.have.property("CreditCard").to.be.a("function");

    done();
  });

  it("Should export the 'DateString' validator helper", (done) => {
    expect(validators).to.have.property("DateString").to.be.a("function");

    done();
  });

  it("Should export the 'Email' validator helper", (done) => {
    expect(validators).to.have.property("Email").to.be.a("function");

    done();
  });

  it("Should export the 'Phone' validator helper", (done) => {
    expect(validators).to.have.property("Phone").to.be.a("function");

    done();
  });

  it("Should export the 'Pis' validator helper", (done) => {
    expect(validators).to.have.property("Pis").to.be.a("function");

    done();
  });

  it("Should export the 'Url' validator helper", (done) => {
    expect(validators).to.have.property("Url").to.be.a("function");

    done();
  });
});
