import "mocha";
import { expect } from "chai";

import * as Utils from "./Utils";

const functionList = [
  "AssertIsNumber",
  "AssertIsString",
  "CheckNumberRepetition",
  "IsNumberOrString",
  "PadWith",
  "PadWithZeroes",
  "SanitizeToDigits"
];

describe("Utils", () => {
  // EXPORT TEST
  // --------------------------------------------------------------------

  describe("Exports", () => {
    for (let functionName of functionList) {
      it(`Should export the '${functionName}' function`, (done) => {
        expect(Utils).to.have.property(functionName).to.be.a("function");
        done();
      });
    }
  });

  // FUNCTION TESTS
  // --------------------------------------------------------------------

  // AssertIsNumber
  describe("AssertIsNumber", () => {

  });

  // AssertIsString
  describe("AssertIsString", () => {

  });

  // CheckNumberRepetition
  describe("CheckNumberRepetition", () => {

  });

  // IsNumberOrString
  describe("IsNumberOrString", () => {

  });

  // PadWith
  describe("PadWith", () => {

  });

  // PadWithZeroes
  describe("PadWithZeroes", () => {

  });

  // SanitizeToDigits
  describe("SanitizeToDigits", () => {

  });
});
