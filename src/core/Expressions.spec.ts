import "mocha";
import { expect } from "chai";
import { 
  Cep, 
  Phone, 
  PhoneMask, 
  PhoneMaskCell,
  Cpf, 
  Cnpj, 
  Pis, 
  CpfMask, 
  CnpjMask, 
  PisMask, 
  Uuid, 
  Email, 
  IsoDate, 
  UtcDate, 
  RegularDate, 
  RegularDateMask, 
  Url 
} from "./Expressions";

describe("Expressions", () => {
  describe("Phone", () => {
    let testPhoneNumbers: string[] = [
          "(11) 9999-9999",
          "(11) 99999-9999",
          "11 1234-1234",
          "11 12345-1234",
          "1112341234",
          "11234567894"
        ],
        testFalseNumbers: string[] = [
          "1289",
          "895739347859237",
          "85hyrjfiwelvk",
          "",
          "79h358m",
          "//[´/[;/´~[/"
        ];

    it("Should match brazilian telephone/cellphone strings", (done) => {
      for (let n = 0; n < testPhoneNumbers.length; n++) {
        expect(Phone.test(testPhoneNumbers[n])).to.be.a("boolean").equals(true);
      }

      done();
    });

    it("Anything not telephone-like should return false", (done) => {
      for (let n = 0; n < testFalseNumbers.length; n++) {
        expect(Phone.test(testFalseNumbers[n])).to.be.a("boolean").equals(false);
      }

      done();
    });

    it("PhoneMask should match segments of a 'valid' phone string", (done) => {
      let phone = "(11) 1234-5678",
          match = PhoneMask.exec(phone.trim());

      expect(match).to.be.an("array").lengthOf(5);
      expect(match[1]).to.be.a("string").equals("11");
      expect(match[2]).to.be.a("string").equals("1234");
      expect(match[3]).to.be.a("string").equals("5678");

      done();
    });

    it("PhoneMaskCell should match segments of a 'valid' cellphone string", (done) => {
      let cellphone = "(11) 12345-6789",
          match = PhoneMaskCell.exec(cellphone.trim());

      expect(match).to.be.an("array").lengthOf(5);
      expect(match[1]).to.be.a("string").equals("11");
      expect(match[2]).to.be.a("string").equals("12345");
      expect(match[3]).to.be.a("string").equals("6789");

      done();
    });
  });
  
  describe("CEP", () => {
    it("Should validate CEP-like strings", (done) => {
      let ceps = [
        "00000123",
        "12345678",
        "98789-789"
      ];

      for (let n of ceps) {
        expect(Cep.test(n)).to.be.a("boolean").equals(true);
      }

      done();
    });
    
    it("Should not validate other strings", (done) => {
      let ceps = [
        "v8a6w65e3",
        "8946521",
        "(11) 986809878979"
      ];

      for (let n of ceps) {
        expect(Cep.test(n)).to.be.a("boolean").equals(false);
      }

      done();
    });
  });

  describe("CPF", () => {
    it("Matches CPF-like strings properly (with and without punctuation)", (done) => {
      expect(Cpf.test("000.000.000-00")).to.be.a("boolean").equals(true);
      expect(Cpf.test("99999999999")).to.be.a("boolean").equals(true);
      done();
    });

    it("CpfMask should match the segments of a CPF-like string", (done) => {
      let cpf = "123.456.789-01",
          match = CpfMask.exec(cpf.trim());

      expect(match).to.be.an("array").lengthOf(6);
      expect(match[1]).to.be.a("string").equals("123");
      expect(match[2]).to.be.a("string").equals("456");
      expect(match[3]).to.be.a("string").equals("789");
      expect(match[4]).to.be.a("string").equals("01");
      done();
    });
  });

  describe("CNPJ", () => {
    it("Matches CNPJ-like strings properly (with and without punctuation)", (done) => {
      expect(Cnpj.test("00.000.000/0000-00")).to.be.a("boolean").equal(true);
      expect(Cnpj.test("99999999999999")).to.be.a("boolean").equal(true);
      done();
    });

    it("CnpjMask should match the segments of a CNPJ-like string", (done) => {
      let cnpj = "01.234.567/8901-23",
          match = CnpjMask.exec(cnpj.trim());

      expect(match).to.be.an("array").lengthOf(7);
      expect(match[1]).to.be.a("string").equals("01");
      expect(match[2]).to.be.a("string").equals("234");
      expect(match[3]).to.be.a("string").equals("567");
      expect(match[4]).to.be.a("string").equals("8901");
      expect(match[5]).to.be.a("string").equals("23");
      done();
    });
  });

  describe("PIS", () => {
    it("Matches PIS-like strings properly (with and without punctuation)", (done) => {
      expect(Pis.test("00.00000.000-0")).to.be.a("boolean").equals(true);
      expect(Pis.test("99999999999")).to.be.a("boolean").equals(true);
      done();
    });

    it("PisMask should match the segments of a PIS-like string", (done) => {
      let pis = "12.34567.890-1",
          match = PisMask.exec(pis.trim());

      expect(match).to.be.an("array").lengthOf(6);
      expect(match[1]).to.be.a("string").equals("12");
      expect(match[2]).to.be.a("string").equals("34567");
      expect(match[3]).to.be.a("string").equals("890");
      expect(match[4]).to.be.a("string").equals("1");
      done();
    });
  });

  describe("GUID/UUID", () => {
    it("Matches GUID/UUID strings", (done) => {
      let uuidList = [
        "51cbe9a2-bbda-4339-8134-8d404517e3b7",
        "99d991dd24b741b4a066fb0052d575a0",
        "{124897ab-cfae-f29e-bc2f-eac2b98fbafb}"
      ];

      for (let n of uuidList) {
        expect(Uuid.test(n.trim())).to.be.a("boolean").equals(true);
      }

      done();
    });
  });

  describe("Email", () => {
    it("Should match valid e-mail addresses", (done) => {
      let emails = [
        "lab@yuiti.dev",
        "lab@hyky.games",
        "teste@banco.bradesco",
        "hello-test@alcatel-lucent.com",
        "hello.test.long.name@goo.gl"
      ];
  
      for (let email of emails) {
        expect(Email.test(email)).to.be.a("boolean").equals(true);
      }
  
      done();
    });
  });

  describe("Date", () => {
    let date = new Date();

    it("RegularDate should match the 'DD/MM/YYYY' format", (done) => {
      let dateList = [
        "30031974",
        "21121965",
        "13/10/1996",
        "01/012015",
        "1309/2020"
      ];

      for (let date of dateList) {
        expect(RegularDate.test(date.trim())).to.be.a("boolean").equals(true);
      }

      done();
    });
    
    it("RegularDateMask should match segments of a 'DD/MM/YYYY' string", (done) => {
      let date = "21/10/1954",
          match = RegularDateMask.exec(date);

      expect(match).to.be.an("array").lengthOf(5);
      expect(match[1]).to.be.a("string").equals("21");
      expect(match[2]).to.be.a("string").equals("10");
      expect(match[3]).to.be.a("string").equals("1954");
      done();
    });

    it("Matches ISO date format", (done) => {
      expect(IsoDate.test(date.toISOString())).to.be.a("boolean").equal(true);
      done();
    });

    it("Matches GMT/UTC date format", (done) => {
      expect(UtcDate.test(date.toUTCString())).to.be.a("boolean").equals(true);
      done();
    });
  });
  
  describe("URL", () => {
    it("Should validate valid url-strings", (done) => {
      let urlList = [
        "http://foo.com/blah_blah",
        "http://foo.com/blah_blah/",
        "http://foo.com/blah_blah_(wikipedia)",
        "http://foo.com/blah_blah_(wikipedia)_(again)",
        "http://www.example.com/wpstyle/?p=364",
        "https://www.example.com/foo/?bar=baz&inga=42&quux",
        "http://✪df.ws/123",
        "http://userid:password@example.com:8080",
        "http://userid:password@example.com:8080/",
        "http://userid@example.com",
        "http://userid@example.com/",
        "http://userid@example.com:8080",
        "http://userid@example.com:8080/",
        "http://userid:password@example.com",
        "http://userid:password@example.com/",
        "http://142.42.1.1/",
        "http://142.42.1.1:8080/",
        "http://➡.ws/䨹",
        "http://⌘.ws",
        "http://⌘.ws/",
        "http://foo.com/blah_(wikipedia)#cite-1",
        "http://foo.com/blah_(wikipedia)_blah#cite-1",
        "http://foo.com/unicode_(✪)_in_parens",
        "http://foo.com/(something)?after=parens",
        "http://☺.damowmow.com/",
        "http://code.google.com/events/#&product=browser",
        "http://j.mp",
        "ftp://foo.bar/baz",
        "http://foo.bar/?q=Test%20URL-encoded%20stuff",
        "http://مثال.إختبار",
        "http://例子.测试",
        "http://उदाहरण.परीक्षा",
        "http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com",
        "http://1337.net",
        "http://a.b-c.de",
        "http://223.255.255.254"
      ];
  
      for (let url of urlList) {
        expect(Url.test(url)).to.be.a("boolean").equals(true);
      }
  
      done();
    });
  });
});