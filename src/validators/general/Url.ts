import { Url as UrlRegex } from "../../utils/Expressions";

/**
 * Validators/General/Url
 * ----------------------------------------------------------------------
 * Simple URL string validation class.
 *
 * @since 0.5.0
 */
export class Url {
  /**
   * Simple validation for URL strings with regular expressions.
   * 
   * @param url 
   *     URL to test 
   */
  static validate (url: string): boolean {
    if (typeof url !== "string") return false;
    url = url.trim();
    if (url === "") return false;
    return UrlRegex.test(url);
  }
}
