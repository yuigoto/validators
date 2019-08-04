import { Url as UrlRegex } from "../utils/Expressions";

/**
 * General/Url
 * ----------------------------------------------------------------------
 * Simple URL string validation class.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class Url {
  /**
   * Simple validation for URL strings with regular expressions.
   * 
   * @param {String} url 
   *     URL to test 
   * @returns {Boolean}
   */
  static validate (url) {
    if (typeof url !== "string") return false;
    url = url.trim();
    if (url === "") return false;
    return UrlRegex.test(url);
  }
}
