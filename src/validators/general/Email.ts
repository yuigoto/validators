import { Email as EmailRegex } from "../../utils/Expressions";

/**
 * Validators/General/Email
 * ----------------------------------------------------------------------
 * Simple e-mail address string validation class.
 *
 * @since 0.5.0
 */
export class Email {
  /**
   * Simple validation for an e-mail address string using regular expressions, 
   * with no MX validation.
   * 
   * @param address 
   *     E-mail address to compare and validate
   */
  static validateAddress (address: string): boolean {
    if (typeof address !== "string") return false;
    address = address.trim();
    if (address === "") return false;
    return EmailRegex.test(address);
  }
}
