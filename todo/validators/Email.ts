import {
  Email as EmailRegex
} from "../core/Expressions";

/**
 * validators/Email
 * ----------------------------------------------------------------------
 * Simple e-mail address string validation class.
 *
 * @since     0.5.0
 */
export class Email {
  /**
   * Simple validation for an e-mail address string using regular expressions, 
   * with no MX validation.
   * 
   * @param value 
   *     E-mail address to compare and validate
   */
  public static validate (value: any): boolean {
    if (typeof value !== "string") return false;
    value = value.trim();

    if (value === "") return false;
    return EmailRegex.test(value);
  }
}
