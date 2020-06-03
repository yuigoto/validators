import {
  Url as UrlRegex
} from "../core/Expressions";

/**
 * validators/Url
 * ----------------------------------------------------------------------
 * Simple URL string validation class.
 *
 * @since     0.5.0
 */
export class Url {
  /**
   * Simple validation for URL strings with regular expressions.
   * 
   * @param url 
   *     URL to test 
   */
  public static validate (value: any): boolean {
    if (typeof value !== "string") return false;
    value = value.trim();
    if (value === "") return false;

    if (/^(?:(?:(?:https?|ftp):)?\/\/)(localhost)(\:[\d]+)?\/?$/.test(value)) {
      return true;
    }

    return UrlRegex.test(value);
  }
}
