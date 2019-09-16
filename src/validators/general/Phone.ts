import {
  Phone as PhoneRegex,
  PhoneMask
} from "../../utils/Expressions";
import { Utils } from "../../utils/Utils";

/**
 * Validators/General/Phone
 * ----------------------------------------------------------------------
 * Simple brazilian phone number validation class.
 *
 * @since 0.5.0
 */
export class Phone {
  /**
   * Provides some basic input masking.
   * 
   * @param input 
   *     Value to filter 
   */
  static filter (input: any): string {
    input = Phone.sanitize(input);
    if (!input) return "";

    if (input.length > 8) input = input.substring(0, 8);

    let slices = PhoneMask.exec(input),
        returnable = "";
    
    if (slices[1] === undefined) return "";

    returnable += "(" + slices[1];
    if (slices[2] !== undefined) returnable += ") " + slices[2];
    if (slices[3] !== undefined) returnable += "-" + slices[3];

    return returnable;
  }

  /**
   * Simple validation for URL strings with regular expressions.
   * 
   * @param phone 
   *     URL to test 
   */
  static validate (phone: string): boolean {
    if (typeof phone !== "string") return false;
    phone = phone.trim();
    if (phone === "") return false;
    return PhoneRegex.test(phone);
  }

  /**
   * Sanitizes value, making sure it's always a proper string.
   * 
   * @param input 
   *     Value to sanitize
   */
  static sanitize (input: any): string|boolean {
    input = Utils.assertIsString(input, true);
    if (input === false) return false;
    
    input = Utils.sanitizeToDigits(input);
    if (!input) return false;

    return input;
  }
}
