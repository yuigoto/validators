import "mocha";
import { expect } from "chai";
import { Url } from "./Url";

describe("URL", () => {
  it("Should declare the 'validate' method", (done) => {
    expect(Url).to.have.property("validate").to.be.a("function");
    done();
  });

  it("Should validate localhost", (done) => {
    let urlList = [
      "http://localhost",
      "https://localhost",
      "http://localhost/",
      "https://localhost/",
      "http://localhost:8080",
      "https://localhost:8086",
      "http://localhost:8086/",
      "https://localhost:8086/"
    ];

    for (let url of urlList) {
      expect(Url.validate(url)).to.be.a("boolean").equals(true);
    }

    done();
  });

  it("Should validate 'valid' URL strings", (done) => {
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
      expect(Url.validate(url)).to.be.a("boolean").equals(true);
    }

    done();
  });
});
