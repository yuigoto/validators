/**
 * utils/Utils.spec
 * ----------------------------------------------------------------------
 * Test all exported helper functions from `Utils`.
 *
 * @since   0.5.0
 */
import {
  AssertIsString,
  CheckNumberRepetition,
  IsNumberOrString,
  PadWithZeroes,
  SanitizeToDigits
} from "../utils/Utils";
import { expect } from "chai";
import "mocha";

describe("Utils", () => {
  describe("AssertIsString", () => {
    it("Strings should be bypassed", (done) => {
      let parsed = AssertIsString("hello, world");

      expect(parsed).to.be.a("string").equals("hello, world");
      done();
    });

    it("Should convert numbers to string", (done) => {
      let parsed = AssertIsString(9786123);

      expect(parsed).to.be.a("string").equals("9786123");
      done();
    });

    it("`notEmpty` should affect how empty strings are parsed", (done) => {
      let parsedEmpty = AssertIsString(""),
          parsedNotEmpty = AssertIsString("", true);

      expect(parsedEmpty).to.be.a("string").equals("");
      expect(parsedNotEmpty).to.be.a("boolean").equals(false);
      done();
    });
  });

  describe("IsNumberOrString", () => {
    it("Should validate if any string or number is passed", (done) => {
      let itemList = [
        "823496236h123y598123y85og123oitqwzsdngf",
        "/;]~/[;];/~][;~/;[;´/~[/[]",
        "",
        " ",
        "7654737867856478",
        "false",
        "hello",
        12,
        785.426719284,
        19e32,
        0xffd832
      ];

      for (let item of itemList) {
        expect(IsNumberOrString(item)).to.equals(true);
      }
      
      done();
    });

    it("Other item types should not validate", (done) => {
      let itemList = [
        {},
        {a:1,b:2,c:3},
        [1,2,3,4],
        false,
        true,
        null,
        undefined
      ];

      for (let item of itemList) {
        expect(IsNumberOrString(item)).to.equals(false);
      }
      
      done();
    });
  });

  describe("CheckNumberRepetition", () => {
    it("Sequences of 'valid' repeated numbers should validate to `true`", (done) => {
      let itemList = [
        "00000000000",
        "11111",
        "2222222",
        333333333,
        "44444444444",
        5555555,
        "666666666",
        777777777,
        "888888888888888888888",
        "99999999999999"
      ];

      for (let item of itemList) {
        let len = item.toString().length;

        expect(CheckNumberRepetition(item, len)).to.be.a("boolean").equals(true);
      }
      
      done();
    });

    it("Sequences of numbers should validate to `false`", (done) => {
      let itemList = [
        "624623462346234",
        "115232",
        "124312",
        9876745543,
        "13131232112"
      ];

      for (let item of itemList) {
        let len = item.toString().length;

        expect(CheckNumberRepetition(item, len)).to.be.a("boolean").equals(false);
      }
      
      done();
    });
  });

  describe("PadWithZeroes", () => {
    let toPad = "456",
        padded;

    it("Should pad with 7 zeroes to the left", (done) => {
      padded = PadWithZeroes(toPad, toPad.length + 7);

      expect(padded).to.be.a("string").match(/^0{7}/);
      done();
    });

    it("Should pad with 7 zeroes to the right", (done) => {
      padded = PadWithZeroes(toPad, toPad.length + 7, true);

      expect(padded).to.be.a("string").match(/0{7}$/);
      done();
    });
  });

  describe("SanitizeToDigits", () => {
    it("Test strings should contain only digits", (done) => {
      let itemList = [
        "h923g1j039598um890u2019353",
        "702394784623976",
        "[;7´34;´734;7[;234723472436]3/,.6,;34,6;,23.4;634,3@#&<>$@#:&@#$&@#"
      ];

      for (let item of itemList) {
        expect(SanitizeToDigits(item)).to.be.a("string").match(/^([\d]+)$/);
      }
      
      done();
    });

    it("Test strings without digits should return empty", (done) => {
      let itemList = [
        "/´=-;´;=/´;-=+_+{`?}+}+§ºª",
        "                           ",
        "biubavsdbuiasuvthuiah¨@#$¨@#$"
      ];

      for (let item of itemList) {
        expect(SanitizeToDigits(item)).to.be.a("string").equals("");
      }
      
      done();
    });
  });

  describe("SanitizeToDigitsWithAssertion", () => {
    it("Test strings should contain only digits", (done) => {
      let itemList = [
        "h923g1j039598um890u2019353",
        "702394784623976",
        "[;7´34;´734;7[;234723472436]3/,.6,;34,6;,23.4;634,3@#&<>$@#:&@#$&@#"
      ];

      for (let item of itemList) {
        expect(SanitizeToDigits(item)).to.be.a("string").match(/^([\d]+)$/);
      }
      
      done();
    });

    it("Test numbers should become strings with only digits", (done) => {
      let itemList = [
        7586.2353215,
        1426174,
        12,
        182e10
      ];

      for (let item of itemList) {
        expect(SanitizeToDigits(item)).to.be.a("string").match(/^([\d]+)$/);
      }

      done();
    });
  });
});
