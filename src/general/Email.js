import { Email as EmailRegex } from "../utils/Expressions";

/**
 * General/Email
 * ----------------------------------------------------------------------
 * Simple e-mail address string validation class.
 * 
 * @author    Fabio Y. Goto <lab@yuiti.dev>
 * @since     0.0.1
 */
export class Email {
  /**
   * Simple validation for an e-mail address string using regular expressions, 
   * with no MX validation.
   * 
   * @param {String} address 
   *     E-mail address to compare and validate
   * @returns {Boolean}
   */
  static validateAddress (address) {
    if (typeof address !== "string") return false;
    address = address.trim();
    if (address === "") return false;
    return EmailRegex.test(address);
  }
}
